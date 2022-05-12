function g() {}
function E(t) {
    return t();
}
function j() {
    return Object.create(null);
}
function i(t) {
    t.forEach(E);
}
function q(t) {
    return typeof t == "function";
}
function A(t, e) {
    return t != t
        ? e == e
        : t !== e || (t && typeof t == "object") || typeof t == "function";
}
function B(t) {
    return Object.keys(t).length === 0;
}
function M(t, e, n) {
    t.insertBefore(e, n || null);
}
function O(t) {
    t.parentNode.removeChild(t);
}
function P(t) {
    return document.createElement(t);
}
function z(t) {
    return Array.from(t.childNodes);
}
let p;
function s(t) {
    p = t;
}
const a = [],
    S = [],
    d = [],
    C = [],
    D = Promise.resolve();
let $ = !1;
function F() {
    $ || (($ = !0), D.then(N));
}
function y(t) {
    d.push(t);
}
const b = new Set();
let _ = 0;
function N() {
    const t = p;
    do {
        for (; _ < a.length; ) {
            const e = a[_];
            _++, s(e), G(e.$$);
        }
        for (s(null), a.length = 0, _ = 0; S.length; ) S.pop()();
        for (let e = 0; e < d.length; e += 1) {
            const n = d[e];
            b.has(n) || (b.add(n), n());
        }
        d.length = 0;
    } while (a.length);
    for (; C.length; ) C.pop()();
    ($ = !1), b.clear(), s(t);
}
function G(t) {
    if (t.fragment !== null) {
        t.update(), i(t.before_update);
        const e = t.dirty;
        (t.dirty = [-1]),
            t.fragment && t.fragment.p(t.ctx, e),
            t.after_update.forEach(y);
    }
}
const H = new Set();
function I(t, e) {
    t && t.i && (H.delete(t), t.i(e));
}
function J(t, e, n, o) {
    const { fragment: c, on_mount: h, on_destroy: l, after_update: m } = t.$$;
    c && c.m(e, n),
        o ||
            y(() => {
                const f = h.map(E).filter(q);
                l ? l.push(...f) : i(f), (t.$$.on_mount = []);
            }),
        m.forEach(y);
}
function K(t, e) {
    const n = t.$$;
    n.fragment !== null &&
        (i(n.on_destroy),
        n.fragment && n.fragment.d(e),
        (n.on_destroy = n.fragment = null),
        (n.ctx = []));
}
function L(t, e) {
    t.$$.dirty[0] === -1 && (a.push(t), F(), t.$$.dirty.fill(0)),
        (t.$$.dirty[(e / 31) | 0] |= 1 << e % 31);
}
function Q(t, e, n, o, c, h, l, m = [-1]) {
    const f = p;
    s(t);
    const r = (t.$$ = {
        fragment: null,
        ctx: null,
        props: h,
        update: g,
        not_equal: c,
        bound: j(),
        on_mount: [],
        on_destroy: [],
        on_disconnect: [],
        before_update: [],
        after_update: [],
        context: new Map(e.context || (f ? f.$$.context : [])),
        callbacks: j(),
        dirty: m,
        skip_bound: !1,
        root: e.target || f.$$.root,
    });
    l && l(r.root);
    let x = !1;
    if (
        ((r.ctx = n
            ? n(t, e.props || {}, (u, k, ...w) => {
                  const v = w.length ? w[0] : k;
                  return (
                      r.ctx &&
                          c(r.ctx[u], (r.ctx[u] = v)) &&
                          (!r.skip_bound && r.bound[u] && r.bound[u](v),
                          x && L(t, u)),
                      k
                  );
              })
            : []),
        r.update(),
        (x = !0),
        i(r.before_update),
        (r.fragment = o ? o(r.ctx) : !1),
        e.target)
    ) {
        if (e.hydrate) {
            const u = z(e.target);
            r.fragment && r.fragment.l(u), u.forEach(O);
        } else r.fragment && r.fragment.c();
        e.intro && I(t.$$.fragment),
            J(t, e.target, e.anchor, e.customElement),
            N();
    }
    s(f);
}
class R {
    $destroy() {
        K(this, 1), (this.$destroy = g);
    }
    $on(e, n) {
        const o = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
        return (
            o.push(n),
            () => {
                const c = o.indexOf(n);
                c !== -1 && o.splice(c, 1);
            }
        );
    }
    $set(e) {
        this.$$set &&
            !B(e) &&
            ((this.$$.skip_bound = !0),
            this.$$set(e),
            (this.$$.skip_bound = !1));
    }
}
export {
    R as SvelteComponent,
    O as detach,
    P as element,
    Q as init,
    M as insert,
    g as noop,
    A as safe_not_equal,
};

//
