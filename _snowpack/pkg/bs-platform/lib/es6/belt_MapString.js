import { a as __2, _ as __1, b as __3 } from '../../../common/curry-b08c8155.js';
import { s as some$2, v as valFromOption, b as caml_string_compare } from '../../../common/caml_primitive-07bc8e41.js';

function sortedLengthAuxMore(xs, _prec, _acc, len, lt) {
  while(true) {
    var acc = _acc;
    var prec = _prec;
    if (acc >= len) {
      return acc;
    }
    var v = xs[acc];
    if (!lt(v, prec)) {
      return acc;
    }
    _acc = acc + 1 | 0;
    _prec = v;
    continue ;
  }}

function strictlySortedLengthU(xs, lt) {
  var len = xs.length;
  if (len === 0 || len === 1) {
    return len;
  }
  var x0 = xs[0];
  var x1 = xs[1];
  if (lt(x0, x1)) {
    var _prec = x1;
    var _acc = 2;
    while(true) {
      var acc = _acc;
      var prec = _prec;
      if (acc >= len) {
        return acc;
      }
      var v = xs[acc];
      if (!lt(prec, v)) {
        return acc;
      }
      _acc = acc + 1 | 0;
      _prec = v;
      continue ;
    }  } else if (lt(x1, x0)) {
    return -sortedLengthAuxMore(xs, x1, 2, len, lt) | 0;
  } else {
    return 1;
  }
}
/* No side effect */

function treeHeight(n) {
  if (n !== undefined) {
    return n.h;
  } else {
    return 0;
  }
}

function create(l, x, d, r) {
  var hl = treeHeight(l);
  var hr = treeHeight(r);
  return {
          k: x,
          v: d,
          h: hl >= hr ? hl + 1 | 0 : hr + 1 | 0,
          l: l,
          r: r
        };
}

function singleton(x, d) {
  return {
          k: x,
          v: d,
          h: 1,
          l: undefined,
          r: undefined
        };
}

function heightGe(l, r) {
  if (r !== undefined) {
    if (l !== undefined) {
      return l.h >= r.h;
    } else {
      return false;
    }
  } else {
    return true;
  }
}

function updateValue(n, newValue) {
  if (n.v === newValue) {
    return n;
  } else {
    return {
            k: n.k,
            v: newValue,
            h: n.h,
            l: n.l,
            r: n.r
          };
  }
}

function bal(l, x, d, r) {
  var hl = l !== undefined ? l.h : 0;
  var hr = r !== undefined ? r.h : 0;
  if (hl > (hr + 2 | 0)) {
    var ll = l.l;
    var lr = l.r;
    if (treeHeight(ll) >= treeHeight(lr)) {
      return create(ll, l.k, l.v, create(lr, x, d, r));
    } else {
      return create(create(ll, l.k, l.v, lr.l), lr.k, lr.v, create(lr.r, x, d, r));
    }
  }
  if (hr <= (hl + 2 | 0)) {
    return {
            k: x,
            v: d,
            h: hl >= hr ? hl + 1 | 0 : hr + 1 | 0,
            l: l,
            r: r
          };
  }
  var rl = r.l;
  var rr = r.r;
  if (treeHeight(rr) >= treeHeight(rl)) {
    return create(create(l, x, d, rl), r.k, r.v, rr);
  } else {
    return create(create(l, x, d, rl.l), rl.k, rl.v, create(rl.r, r.k, r.v, rr));
  }
}

function minKey0Aux(_n) {
  while(true) {
    var n = _n;
    var n$1 = n.l;
    if (n$1 === undefined) {
      return n.k;
    }
    _n = n$1;
    continue ;
  }}

function minKey(n) {
  if (n !== undefined) {
    return some$2(minKey0Aux(n));
  }
  
}

function minKeyUndefined(n) {
  if (n !== undefined) {
    return minKey0Aux(n);
  }
  
}

function maxKey0Aux(_n) {
  while(true) {
    var n = _n;
    var n$1 = n.r;
    if (n$1 === undefined) {
      return n.k;
    }
    _n = n$1;
    continue ;
  }}

function maxKey(n) {
  if (n !== undefined) {
    return some$2(maxKey0Aux(n));
  }
  
}

function maxKeyUndefined(n) {
  if (n !== undefined) {
    return maxKey0Aux(n);
  }
  
}

function minKV0Aux(_n) {
  while(true) {
    var n = _n;
    var n$1 = n.l;
    if (n$1 === undefined) {
      return [
              n.k,
              n.v
            ];
    }
    _n = n$1;
    continue ;
  }}

function minimum(n) {
  if (n !== undefined) {
    return minKV0Aux(n);
  }
  
}

function minUndefined(n) {
  if (n !== undefined) {
    return minKV0Aux(n);
  }
  
}

function maxKV0Aux(_n) {
  while(true) {
    var n = _n;
    var n$1 = n.r;
    if (n$1 === undefined) {
      return [
              n.k,
              n.v
            ];
    }
    _n = n$1;
    continue ;
  }}

function maximum(n) {
  if (n !== undefined) {
    return maxKV0Aux(n);
  }
  
}

function maxUndefined(n) {
  if (n !== undefined) {
    return maxKV0Aux(n);
  }
  
}

function removeMinAuxWithRef(n, kr, vr) {
  var ln = n.l;
  if (ln !== undefined) {
    return bal(removeMinAuxWithRef(ln, kr, vr), n.k, n.v, n.r);
  } else {
    kr.contents = n.k;
    vr.contents = n.v;
    return n.r;
  }
}

function isEmpty(x) {
  return x === undefined;
}

function stackAllLeft(_v, _s) {
  while(true) {
    var s = _s;
    var v = _v;
    if (v === undefined) {
      return s;
    }
    _s = {
      hd: v,
      tl: s
    };
    _v = v.l;
    continue ;
  }}

function findFirstByU(n, p) {
  if (n === undefined) {
    return ;
  }
  var left = findFirstByU(n.l, p);
  if (left !== undefined) {
    return left;
  }
  var v = n.k;
  var d = n.v;
  var pvd = p(v, d);
  if (pvd) {
    return [
            v,
            d
          ];
  }
  var right = findFirstByU(n.r, p);
  if (right !== undefined) {
    return right;
  }
  
}

function findFirstBy(n, p) {
  return findFirstByU(n, __2(p));
}

function forEachU(_n, f) {
  while(true) {
    var n = _n;
    if (n === undefined) {
      return ;
    }
    forEachU(n.l, f);
    f(n.k, n.v);
    _n = n.r;
    continue ;
  }}

function forEach(n, f) {
  return forEachU(n, __2(f));
}

function mapU(n, f) {
  if (n === undefined) {
    return ;
  }
  var newLeft = mapU(n.l, f);
  var newD = f(n.v);
  var newRight = mapU(n.r, f);
  return {
          k: n.k,
          v: newD,
          h: n.h,
          l: newLeft,
          r: newRight
        };
}

function map(n, f) {
  return mapU(n, __1(f));
}

function mapWithKeyU(n, f) {
  if (n === undefined) {
    return ;
  }
  var key = n.k;
  var newLeft = mapWithKeyU(n.l, f);
  var newD = f(key, n.v);
  var newRight = mapWithKeyU(n.r, f);
  return {
          k: key,
          v: newD,
          h: n.h,
          l: newLeft,
          r: newRight
        };
}

function mapWithKey(n, f) {
  return mapWithKeyU(n, __2(f));
}

function reduceU(_m, _accu, f) {
  while(true) {
    var accu = _accu;
    var m = _m;
    if (m === undefined) {
      return accu;
    }
    var v = m.k;
    var d = m.v;
    var l = m.l;
    var r = m.r;
    _accu = f(reduceU(l, accu, f), v, d);
    _m = r;
    continue ;
  }}

function reduce(m, accu, f) {
  return reduceU(m, accu, __3(f));
}

function everyU(_n, p) {
  while(true) {
    var n = _n;
    if (n === undefined) {
      return true;
    }
    if (!p(n.k, n.v)) {
      return false;
    }
    if (!everyU(n.l, p)) {
      return false;
    }
    _n = n.r;
    continue ;
  }}

function every(n, p) {
  return everyU(n, __2(p));
}

function someU(_n, p) {
  while(true) {
    var n = _n;
    if (n === undefined) {
      return false;
    }
    if (p(n.k, n.v)) {
      return true;
    }
    if (someU(n.l, p)) {
      return true;
    }
    _n = n.r;
    continue ;
  }}

function some(n, p) {
  return someU(n, __2(p));
}

function addMinElement(n, k, v) {
  if (n !== undefined) {
    return bal(addMinElement(n.l, k, v), n.k, n.v, n.r);
  } else {
    return singleton(k, v);
  }
}

function addMaxElement(n, k, v) {
  if (n !== undefined) {
    return bal(n.l, n.k, n.v, addMaxElement(n.r, k, v));
  } else {
    return singleton(k, v);
  }
}

function join(ln, v, d, rn) {
  if (ln === undefined) {
    return addMinElement(rn, v, d);
  }
  if (rn === undefined) {
    return addMaxElement(ln, v, d);
  }
  var lv = ln.k;
  var ld = ln.v;
  var lh = ln.h;
  var ll = ln.l;
  var lr = ln.r;
  var rv = rn.k;
  var rd = rn.v;
  var rh = rn.h;
  var rl = rn.l;
  var rr = rn.r;
  if (lh > (rh + 2 | 0)) {
    return bal(ll, lv, ld, join(lr, v, d, rn));
  } else if (rh > (lh + 2 | 0)) {
    return bal(join(ln, v, d, rl), rv, rd, rr);
  } else {
    return create(ln, v, d, rn);
  }
}

function concat(t1, t2) {
  if (t1 === undefined) {
    return t2;
  }
  if (t2 === undefined) {
    return t1;
  }
  var kr = {
    contents: t2.k
  };
  var vr = {
    contents: t2.v
  };
  var t2r = removeMinAuxWithRef(t2, kr, vr);
  return join(t1, kr.contents, vr.contents, t2r);
}

function concatOrJoin(t1, v, d, t2) {
  if (d !== undefined) {
    return join(t1, v, valFromOption(d), t2);
  } else {
    return concat(t1, t2);
  }
}

function keepSharedU(n, p) {
  if (n === undefined) {
    return ;
  }
  var v = n.k;
  var d = n.v;
  var newLeft = keepSharedU(n.l, p);
  var pvd = p(v, d);
  var newRight = keepSharedU(n.r, p);
  if (pvd) {
    return join(newLeft, v, d, newRight);
  } else {
    return concat(newLeft, newRight);
  }
}

function keepShared(n, p) {
  return keepSharedU(n, __2(p));
}

function partitionSharedU(n, p) {
  if (n === undefined) {
    return [
            undefined,
            undefined
          ];
  }
  var key = n.k;
  var value = n.v;
  var match = partitionSharedU(n.l, p);
  var lf = match[1];
  var lt = match[0];
  var pvd = p(key, value);
  var match$1 = partitionSharedU(n.r, p);
  var rf = match$1[1];
  var rt = match$1[0];
  if (pvd) {
    return [
            join(lt, key, value, rt),
            concat(lf, rf)
          ];
  } else {
    return [
            concat(lt, rt),
            join(lf, key, value, rf)
          ];
  }
}

function partitionShared(n, p) {
  return partitionSharedU(n, __2(p));
}

function lengthNode(n) {
  var l = n.l;
  var r = n.r;
  var sizeL = l !== undefined ? lengthNode(l) : 0;
  var sizeR = r !== undefined ? lengthNode(r) : 0;
  return (1 + sizeL | 0) + sizeR | 0;
}

function size(n) {
  if (n !== undefined) {
    return lengthNode(n);
  } else {
    return 0;
  }
}

function toListAux(_n, _accu) {
  while(true) {
    var accu = _accu;
    var n = _n;
    if (n === undefined) {
      return accu;
    }
    var k = n.k;
    var v = n.v;
    var l = n.l;
    var r = n.r;
    _accu = {
      hd: [
        k,
        v
      ],
      tl: toListAux(r, accu)
    };
    _n = l;
    continue ;
  }}

function toList(s) {
  return toListAux(s, /* [] */0);
}

function checkInvariantInternal(_v) {
  while(true) {
    var v = _v;
    if (v === undefined) {
      return ;
    }
    var l = v.l;
    var r = v.r;
    var diff = treeHeight(l) - treeHeight(r) | 0;
    if (!(diff <= 2 && diff >= -2)) {
      throw {
            RE_EXN_ID: "Assert_failure",
            _1: [
              "belt_internalAVLtree.ml",
              373,
              4
            ],
            Error: new Error()
          };
    }
    checkInvariantInternal(l);
    _v = r;
    continue ;
  }}

function fillArrayKey(_n, _i, arr) {
  while(true) {
    var i = _i;
    var n = _n;
    var v = n.k;
    var l = n.l;
    var r = n.r;
    var next = l !== undefined ? fillArrayKey(l, i, arr) : i;
    arr[next] = v;
    var rnext = next + 1 | 0;
    if (r === undefined) {
      return rnext;
    }
    _i = rnext;
    _n = r;
    continue ;
  }}

function fillArrayValue(_n, _i, arr) {
  while(true) {
    var i = _i;
    var n = _n;
    var l = n.l;
    var r = n.r;
    var next = l !== undefined ? fillArrayValue(l, i, arr) : i;
    arr[next] = n.v;
    var rnext = next + 1 | 0;
    if (r === undefined) {
      return rnext;
    }
    _i = rnext;
    _n = r;
    continue ;
  }}

function fillArray(_n, _i, arr) {
  while(true) {
    var i = _i;
    var n = _n;
    var l = n.l;
    var v = n.k;
    var r = n.r;
    var next = l !== undefined ? fillArray(l, i, arr) : i;
    arr[next] = [
      v,
      n.v
    ];
    var rnext = next + 1 | 0;
    if (r === undefined) {
      return rnext;
    }
    _i = rnext;
    _n = r;
    continue ;
  }}

function toArray(n) {
  if (n === undefined) {
    return [];
  }
  var size = lengthNode(n);
  var v = new Array(size);
  fillArray(n, 0, v);
  return v;
}

function keysToArray(n) {
  if (n === undefined) {
    return [];
  }
  var size = lengthNode(n);
  var v = new Array(size);
  fillArrayKey(n, 0, v);
  return v;
}

function valuesToArray(n) {
  if (n === undefined) {
    return [];
  }
  var size = lengthNode(n);
  var v = new Array(size);
  fillArrayValue(n, 0, v);
  return v;
}

function fromSortedArrayRevAux(arr, off, len) {
  switch (len) {
    case 0 :
        return ;
    case 1 :
        var match = arr[off];
        return singleton(match[0], match[1]);
    case 2 :
        var match_0 = arr[off];
        var match_1 = arr[off - 1 | 0];
        var match$1 = match_1;
        var match$2 = match_0;
        return {
                k: match$1[0],
                v: match$1[1],
                h: 2,
                l: singleton(match$2[0], match$2[1]),
                r: undefined
              };
    case 3 :
        var match_0$1 = arr[off];
        var match_1$1 = arr[off - 1 | 0];
        var match_2 = arr[off - 2 | 0];
        var match$3 = match_2;
        var match$4 = match_1$1;
        var match$5 = match_0$1;
        return {
                k: match$4[0],
                v: match$4[1],
                h: 2,
                l: singleton(match$5[0], match$5[1]),
                r: singleton(match$3[0], match$3[1])
              };
    default:
      var nl = len / 2 | 0;
      var left = fromSortedArrayRevAux(arr, off, nl);
      var match$6 = arr[off - nl | 0];
      var right = fromSortedArrayRevAux(arr, (off - nl | 0) - 1 | 0, (len - nl | 0) - 1 | 0);
      return create(left, match$6[0], match$6[1], right);
  }
}

function fromSortedArrayAux(arr, off, len) {
  switch (len) {
    case 0 :
        return ;
    case 1 :
        var match = arr[off];
        return singleton(match[0], match[1]);
    case 2 :
        var match_0 = arr[off];
        var match_1 = arr[off + 1 | 0];
        var match$1 = match_1;
        var match$2 = match_0;
        return {
                k: match$1[0],
                v: match$1[1],
                h: 2,
                l: singleton(match$2[0], match$2[1]),
                r: undefined
              };
    case 3 :
        var match_0$1 = arr[off];
        var match_1$1 = arr[off + 1 | 0];
        var match_2 = arr[off + 2 | 0];
        var match$3 = match_2;
        var match$4 = match_1$1;
        var match$5 = match_0$1;
        return {
                k: match$4[0],
                v: match$4[1],
                h: 2,
                l: singleton(match$5[0], match$5[1]),
                r: singleton(match$3[0], match$3[1])
              };
    default:
      var nl = len / 2 | 0;
      var left = fromSortedArrayAux(arr, off, nl);
      var match$6 = arr[off + nl | 0];
      var right = fromSortedArrayAux(arr, (off + nl | 0) + 1 | 0, (len - nl | 0) - 1 | 0);
      return create(left, match$6[0], match$6[1], right);
  }
}

function rotateWithLeftChild(k2) {
  var k1 = k2.l;
  k2.l = k1.r;
  k1.r = k2;
  var hlk2 = treeHeight(k2.l);
  var hrk2 = treeHeight(k2.r);
  k2.h = (
    hlk2 > hrk2 ? hlk2 : hrk2
  ) + 1 | 0;
  var hlk1 = treeHeight(k1.l);
  var hk2 = k2.h;
  k1.h = (
    hlk1 > hk2 ? hlk1 : hk2
  ) + 1 | 0;
  return k1;
}

function rotateWithRightChild(k1) {
  var k2 = k1.r;
  k1.r = k2.l;
  k2.l = k1;
  var hlk1 = treeHeight(k1.l);
  var hrk1 = treeHeight(k1.r);
  k1.h = (
    hlk1 > hrk1 ? hlk1 : hrk1
  ) + 1 | 0;
  var hrk2 = treeHeight(k2.r);
  var hk1 = k1.h;
  k2.h = (
    hrk2 > hk1 ? hrk2 : hk1
  ) + 1 | 0;
  return k2;
}

function doubleWithLeftChild(k3) {
  var x = k3.l;
  var v = rotateWithRightChild(x);
  k3.l = v;
  return rotateWithLeftChild(k3);
}

function doubleWithRightChild(k2) {
  var x = k2.r;
  var v = rotateWithLeftChild(x);
  k2.r = v;
  return rotateWithRightChild(k2);
}

function heightUpdateMutate(t) {
  var hlt = treeHeight(t.l);
  var hrt = treeHeight(t.r);
  t.h = (
    hlt > hrt ? hlt : hrt
  ) + 1 | 0;
  return t;
}

function balMutate(nt) {
  var l = nt.l;
  var r = nt.r;
  var hl = treeHeight(l);
  var hr = treeHeight(r);
  if (hl > (2 + hr | 0)) {
    var ll = l.l;
    var lr = l.r;
    if (heightGe(ll, lr)) {
      return heightUpdateMutate(rotateWithLeftChild(nt));
    } else {
      return heightUpdateMutate(doubleWithLeftChild(nt));
    }
  }
  if (hr > (2 + hl | 0)) {
    var rl = r.l;
    var rr = r.r;
    if (heightGe(rr, rl)) {
      return heightUpdateMutate(rotateWithRightChild(nt));
    } else {
      return heightUpdateMutate(doubleWithRightChild(nt));
    }
  }
  nt.h = (
    hl > hr ? hl : hr
  ) + 1 | 0;
  return nt;
}
/* No side effect */

function get(_n, x) {
  while(true) {
    var n = _n;
    if (n === undefined) {
      return ;
    }
    var v = n.k;
    if (x === v) {
      return some$2(n.v);
    }
    _n = x < v ? n.l : n.r;
    continue ;
  }}

function getUndefined(_n, x) {
  while(true) {
    var n = _n;
    if (n === undefined) {
      return ;
    }
    var v = n.k;
    if (x === v) {
      return n.v;
    }
    _n = x < v ? n.l : n.r;
    continue ;
  }}

function getExn(_n, x) {
  while(true) {
    var n = _n;
    if (n !== undefined) {
      var v = n.k;
      if (x === v) {
        return n.v;
      }
      _n = x < v ? n.l : n.r;
      continue ;
    }
    throw {
          RE_EXN_ID: "Not_found",
          Error: new Error()
        };
  }}

function getWithDefault(_n, x, def) {
  while(true) {
    var n = _n;
    if (n === undefined) {
      return def;
    }
    var v = n.k;
    if (x === v) {
      return n.v;
    }
    _n = x < v ? n.l : n.r;
    continue ;
  }}

function has(_n, x) {
  while(true) {
    var n = _n;
    if (n === undefined) {
      return false;
    }
    var v = n.k;
    if (x === v) {
      return true;
    }
    _n = x < v ? n.l : n.r;
    continue ;
  }}

function splitAux(x, n) {
  var v = n.k;
  var d = n.v;
  var l = n.l;
  var r = n.r;
  if (x === v) {
    return [
            l,
            some$2(d),
            r
          ];
  }
  if (x < v) {
    if (l === undefined) {
      return [
              undefined,
              undefined,
              n
            ];
    }
    var match = splitAux(x, l);
    return [
            match[0],
            match[1],
            join(match[2], v, d, r)
          ];
  }
  if (r === undefined) {
    return [
            n,
            undefined,
            undefined
          ];
  }
  var match$1 = splitAux(x, r);
  return [
          join(l, v, d, match$1[0]),
          match$1[1],
          match$1[2]
        ];
}

function split(x, n) {
  if (n !== undefined) {
    return splitAux(x, n);
  } else {
    return [
            undefined,
            undefined,
            undefined
          ];
  }
}

function mergeU(s1, s2, f) {
  if (s1 !== undefined) {
    if (s1.h >= (
        s2 !== undefined ? s2.h : 0
      )) {
      var v1 = s1.k;
      var d1 = s1.v;
      var l1 = s1.l;
      var r1 = s1.r;
      var match = split(v1, s2);
      return concatOrJoin(mergeU(l1, match[0], f), v1, f(v1, some$2(d1), match[1]), mergeU(r1, match[2], f));
    }
    
  } else if (s2 === undefined) {
    return ;
  }
  var v2 = s2.k;
  var d2 = s2.v;
  var l2 = s2.l;
  var r2 = s2.r;
  var match$1 = split(v2, s1);
  return concatOrJoin(mergeU(match$1[0], l2, f), v2, f(v2, match$1[1], some$2(d2)), mergeU(match$1[2], r2, f));
}

function merge(s1, s2, f) {
  return mergeU(s1, s2, __3(f));
}

function compareAux(_e1, _e2, vcmp) {
  while(true) {
    var e2 = _e2;
    var e1 = _e1;
    if (!e1) {
      return 0;
    }
    if (!e2) {
      return 0;
    }
    var h2 = e2.hd;
    var h1 = e1.hd;
    var c = caml_string_compare(h1.k, h2.k);
    if (c !== 0) {
      return c;
    }
    var cx = vcmp(h1.v, h2.v);
    if (cx !== 0) {
      return cx;
    }
    _e2 = stackAllLeft(h2.r, e2.tl);
    _e1 = stackAllLeft(h1.r, e1.tl);
    continue ;
  }}

function cmpU(s1, s2, cmp) {
  var len1 = size(s1);
  var len2 = size(s2);
  if (len1 === len2) {
    return compareAux(stackAllLeft(s1, /* [] */0), stackAllLeft(s2, /* [] */0), cmp);
  } else if (len1 < len2) {
    return -1;
  } else {
    return 1;
  }
}

function cmp(s1, s2, f) {
  return cmpU(s1, s2, __2(f));
}

function eqAux(_e1, _e2, eq) {
  while(true) {
    var e2 = _e2;
    var e1 = _e1;
    if (!e1) {
      return true;
    }
    if (!e2) {
      return true;
    }
    var h2 = e2.hd;
    var h1 = e1.hd;
    if (!(h1.k === h2.k && eq(h1.v, h2.v))) {
      return false;
    }
    _e2 = stackAllLeft(h2.r, e2.tl);
    _e1 = stackAllLeft(h1.r, e1.tl);
    continue ;
  }}

function eqU(s1, s2, eq) {
  var len1 = size(s1);
  var len2 = size(s2);
  if (len1 === len2) {
    return eqAux(stackAllLeft(s1, /* [] */0), stackAllLeft(s2, /* [] */0), eq);
  } else {
    return false;
  }
}

function eq(s1, s2, f) {
  return eqU(s1, s2, __2(f));
}

function addMutate(t, x, data) {
  if (t === undefined) {
    return singleton(x, data);
  }
  var k = t.k;
  if (x === k) {
    t.k = x;
    t.v = data;
    return t;
  }
  var l = t.l;
  var r = t.r;
  if (x < k) {
    var ll = addMutate(l, x, data);
    t.l = ll;
  } else {
    t.r = addMutate(r, x, data);
  }
  return balMutate(t);
}

function fromArray(xs) {
  var len = xs.length;
  if (len === 0) {
    return ;
  }
  var next = strictlySortedLengthU(xs, (function (param, param$1) {
          return param[0] < param$1[0];
        }));
  var result;
  if (next >= 0) {
    result = fromSortedArrayAux(xs, 0, next);
  } else {
    next = -next | 0;
    result = fromSortedArrayRevAux(xs, next - 1 | 0, next);
  }
  for(var i = next; i < len; ++i){
    var match = xs[i];
    result = addMutate(result, match[0], match[1]);
  }
  return result;
}
/* No side effect */

function set(t, newK, newD) {
  if (t === undefined) {
    return singleton(newK, newD);
  }
  var k = t.k;
  if (newK === k) {
    return updateValue(t, newD);
  }
  var v = t.v;
  if (newK < k) {
    return bal(set(t.l, newK, newD), k, v, t.r);
  } else {
    return bal(t.l, k, v, set(t.r, newK, newD));
  }
}

function updateU(t, x, f) {
  if (t !== undefined) {
    var k = t.k;
    if (x === k) {
      var data = f(some$2(t.v));
      if (data !== undefined) {
        return updateValue(t, valFromOption(data));
      }
      var l = t.l;
      var r = t.r;
      if (l === undefined) {
        return r;
      }
      if (r === undefined) {
        return l;
      }
      var kr = {
        contents: r.k
      };
      var vr = {
        contents: r.v
      };
      var r$1 = removeMinAuxWithRef(r, kr, vr);
      return bal(l, kr.contents, vr.contents, r$1);
    }
    var v = t.v;
    var l$1 = t.l;
    var r$2 = t.r;
    if (x < k) {
      var ll = updateU(l$1, x, f);
      if (l$1 === ll) {
        return t;
      } else {
        return bal(ll, k, v, r$2);
      }
    }
    var rr = updateU(r$2, x, f);
    if (r$2 === rr) {
      return t;
    } else {
      return bal(l$1, k, v, rr);
    }
  }
  var data$1 = f(undefined);
  if (data$1 !== undefined) {
    return singleton(x, valFromOption(data$1));
  } else {
    return t;
  }
}

function update(t, x, f) {
  return updateU(t, x, __1(f));
}

function removeAux(n, x) {
  var v = n.k;
  var l = n.l;
  var r = n.r;
  if (x === v) {
    if (l === undefined) {
      return r;
    }
    if (r === undefined) {
      return l;
    }
    var kr = {
      contents: r.k
    };
    var vr = {
      contents: r.v
    };
    var r$1 = removeMinAuxWithRef(r, kr, vr);
    return bal(l, kr.contents, vr.contents, r$1);
  }
  if (x < v) {
    if (l === undefined) {
      return n;
    }
    var ll = removeAux(l, x);
    if (ll === l) {
      return n;
    } else {
      return bal(ll, v, n.v, r);
    }
  }
  if (r === undefined) {
    return n;
  }
  var rr = removeAux(r, x);
  return bal(l, v, n.v, rr);
}

function remove(n, x) {
  if (n !== undefined) {
    return removeAux(n, x);
  }
  
}

function removeMany(t, keys) {
  var len = keys.length;
  if (t !== undefined) {
    var _t = t;
    var _i = 0;
    while(true) {
      var i = _i;
      var t$1 = _t;
      if (i >= len) {
        return t$1;
      }
      var ele = keys[i];
      var u = removeAux(t$1, ele);
      if (u === undefined) {
        return u;
      }
      _i = i + 1 | 0;
      _t = u;
      continue ;
    }  }
  
}

function mergeMany(h, arr) {
  var len = arr.length;
  var v = h;
  for(var i = 0; i < len; ++i){
    var match = arr[i];
    v = set(v, match[0], match[1]);
  }
  return v;
}

var empty;

var isEmpty$1 = isEmpty;

var has$1 = has;

var cmpU$1 = cmpU;

var cmp$1 = cmp;

var eqU$1 = eqU;

var eq$1 = eq;

var findFirstByU$1 = findFirstByU;

var findFirstBy$1 = findFirstBy;

var forEachU$1 = forEachU;

var forEach$1 = forEach;

var reduceU$1 = reduceU;

var reduce$1 = reduce;

var everyU$1 = everyU;

var every$1 = every;

var someU$1 = someU;

var some$1 = some;

var size$1 = size;

var toList$1 = toList;

var toArray$1 = toArray;

var fromArray$1 = fromArray;

var keysToArray$1 = keysToArray;

var valuesToArray$1 = valuesToArray;

var minKey$1 = minKey;

var minKeyUndefined$1 = minKeyUndefined;

var maxKey$1 = maxKey;

var maxKeyUndefined$1 = maxKeyUndefined;

var minimum$1 = minimum;

var minUndefined$1 = minUndefined;

var maximum$1 = maximum;

var maxUndefined$1 = maxUndefined;

var get$1 = get;

var getUndefined$1 = getUndefined;

var getWithDefault$1 = getWithDefault;

var getExn$1 = getExn;

var checkInvariantInternal$1 = checkInvariantInternal;

var mergeU$1 = mergeU;

var merge$1 = merge;

var keepU = keepSharedU;

var keep = keepShared;

var partitionU = partitionSharedU;

var partition = partitionShared;

var split$1 = split;

var mapU$1 = mapU;

var map$1 = map;

var mapWithKeyU$1 = mapWithKeyU;

var mapWithKey$1 = mapWithKey;
/* No side effect */

export { checkInvariantInternal$1 as checkInvariantInternal, cmp$1 as cmp, cmpU$1 as cmpU, empty, eq$1 as eq, eqU$1 as eqU, every$1 as every, everyU$1 as everyU, findFirstBy$1 as findFirstBy, findFirstByU$1 as findFirstByU, forEach$1 as forEach, forEachU$1 as forEachU, fromArray$1 as fromArray, get$1 as get, getExn$1 as getExn, getUndefined$1 as getUndefined, getWithDefault$1 as getWithDefault, has$1 as has, isEmpty$1 as isEmpty, keep, keepU, keysToArray$1 as keysToArray, map$1 as map, mapU$1 as mapU, mapWithKey$1 as mapWithKey, mapWithKeyU$1 as mapWithKeyU, maxKey$1 as maxKey, maxKeyUndefined$1 as maxKeyUndefined, maxUndefined$1 as maxUndefined, maximum$1 as maximum, merge$1 as merge, mergeMany, mergeU$1 as mergeU, minKey$1 as minKey, minKeyUndefined$1 as minKeyUndefined, minUndefined$1 as minUndefined, minimum$1 as minimum, partition, partitionU, reduce$1 as reduce, reduceU$1 as reduceU, remove, removeMany, set, size$1 as size, some$1 as some, someU$1 as someU, split$1 as split, toArray$1 as toArray, toList$1 as toList, update, updateU, valuesToArray$1 as valuesToArray };
