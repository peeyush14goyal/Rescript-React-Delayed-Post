let s = React.string
let arr = React.array

open Belt

type state = {posts: array<Post.t>, forDeletion: Map.String.t<Js.Global.timeoutId>}

type action =
  | DeleteLater(Post.t, Js.Global.timeoutId)
  | DeleteAbort(Post.t)
  | DeleteNow(Post.t)


let reducer = (state, action) =>
  switch action {
  | DeleteLater(post, timeoutId) => {...state, forDeletion: Belt.Map.String.set(state.forDeletion, post.id, timeoutId)}
  | DeleteAbort(post) => {...state, forDeletion: Belt.Map.String.remove(state.forDeletion, post.id) }
  | DeleteNow(post) => {posts: Js.Array.filter(x => x->Post.id != post.id, state.posts), forDeletion: Belt.Map.String.remove(state.forDeletion, post.id)}
  }

let initialState = {posts: Post.examples, forDeletion: Map.String.empty}





module PostView = {
  @react.component
  let make = (~post, ~description, ~dispatch) => {
  <div className="bg-green-700 hover:bg-green-900 text-gray-300 hover:text-gray-100 px-8 py-4 mb-4">
    <h2 className="text-2xl mb-1">{s(post.Post.title)}</h2>
    <h3 className="mb-4">{s(post.Post.author)}</h3>
    {arr(description)}
    <button onClick={_mouseEvt => {
      dispatch(DeleteLater(post, Js.Global.setTimeout(() => {
        dispatch(DeleteNow(post))
      }, 10000)))
    }
  } className="mr-4 mt-4 bg-red-500 hover:bg-red-900 text-white py-2 px-4">{s("Remove this post")}</button>
  </div>
  }
}

module NotifyView = {
  @react.component
  let make = (~x, ~handleRestore, ~handleDeleteImmediately) => {
    <div className="relative bg-yellow-100 px-8 py-4 mb-4 h-40">
      <p className="text-center white mb-1">
        {s({`This post from ${x->Post.title} by ${x->Post.author} will be permanently removed in 10 seconds.`})}
      </p>
      <div className="flex justify-center">
        <button onClick={_mouseEvt => {
            handleRestore(_mouseEvt)
        }} className="mr-4 mt-4 bg-yellow-500 hover:bg-yellow-900 text-white py-2 px-4">{s("Restore")}</button
        ><button onClick={_mouseEvt => {
          handleDeleteImmediately(_mouseEvt)
        }} className="mr-4 mt-4 bg-red-500 hover:bg-red-900 text-white py-2 px-4">{s("Delete Immediately")}</button>
      </div>
      <div className="bg-red-500 h-2 w-full absolute top-0 left-0 progress"></div>
    </div>
  }
}

@react.component
let make = () => {
  let (state, dispatch) = React.useReducer(reducer, initialState)

  let posts = state.posts->Belt.Array.map(x => {



    if(Belt.Map.String.has(state.forDeletion, x->Post.id))
    {
      let handleRestore = (_mouseEvt) => {
        Js.Global.clearTimeout(Belt.Map.String.getExn(state.forDeletion, x->Post.id))
        dispatch(DeleteAbort(x))
      }

      let handleDeleteImmediately = (_mouseEvt) => {
        Js.Global.clearTimeout(Belt.Map.String.getExn(state.forDeletion, x->Post.id))
        dispatch(DeleteNow(x))
      }

      <NotifyView x=x handleRestore=handleRestore handleDeleteImmediately=handleDeleteImmediately/>
    }
    else
    {
      let description = (x.text)->Belt.Array.map(txt => <p className="mb-1 text-sm">{s(txt)}</p>)
      <PostView post=x  description=description dispatch=dispatch/>
    }
  })

  <div className="max-w-3xl mx-auto mt-8 relative"> {posts->React.array} </div>
}
