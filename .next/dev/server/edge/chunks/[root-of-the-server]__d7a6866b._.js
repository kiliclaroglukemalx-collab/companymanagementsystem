(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__d7a6866b._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/Desktop/companymanagementsystem/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/companymanagementsystem/node_modules/jose/dist/webapi/jwt/verify.js [middleware-edge] (ecmascript)");
;
;
const AUTH_COOKIE = "cms-auth";
async function middleware(request) {
    const { pathname } = request.nextUrl;
    const isLoginRoute = pathname === "/login";
    const isNextAsset = pathname.startsWith("/_next");
    const isPublicFile = /\.[^/]+$/.test(pathname);
    const isLoginApiRoute = pathname === "/api/auth/login";
    const isLegacyLoginRoute = pathname === "/api/login";
    const isFirstPasswordRoute = pathname === "/api/auth/first-password";
    const isApiRoute = pathname.startsWith("/api");
    if (isNextAsset || isPublicFile || isLoginApiRoute || isLegacyLoginRoute || isFirstPasswordRoute) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    const token = request.cookies.get(AUTH_COOKIE)?.value;
    const secret = process.env.AUTH_SECRET_KEY;
    let authPayload = null;
    if (token && secret) {
        try {
            const { payload } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["jwtVerify"])(token, new TextEncoder().encode(secret));
            const siteId = payload.siteId;
            const role = payload.role;
            const userId = payload.sub;
            const sessionId = payload.sid;
            if (typeof siteId === "string" && typeof role === "string") {
                authPayload = {
                    siteId,
                    role,
                    userId: typeof userId === "string" ? userId : undefined,
                    sessionId: typeof sessionId === "string" ? sessionId : undefined
                };
            }
        } catch  {
            authPayload = null;
        }
    }
    const isAuthed = Boolean(authPayload);
    const isGuardRoute = pathname === "/guard";
    // Guard route herkese açık
    if (isGuardRoute) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    // Login olan kullanıcı /login veya /guard'a giderse anasayfaya yönlendir
    if ((isLoginRoute || isGuardRoute) && isAuthed) {
        const url = request.nextUrl.clone();
        url.pathname = "/";
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(url);
    }
    // Login olmayan kullanıcı /login dışında bir yere giderse /guard'a yönlendir
    if (!isLoginRoute && !isGuardRoute && !isAuthed) {
        if (isApiRoute) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Unauthorized"
            }, {
                status: 401
            });
        }
        const url = request.nextUrl.clone();
        url.pathname = "/guard";
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(url);
    }
    if (authPayload) {
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set("x-site-id", authPayload.siteId);
        requestHeaders.set("x-user-role", authPayload.role);
        if (authPayload.userId) {
            requestHeaders.set("x-user-id", authPayload.userId);
        }
        if (authPayload.sessionId) {
            requestHeaders.set("x-session-id", authPayload.sessionId);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next({
            request: {
                headers: requestHeaders
            }
        });
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$companymanagementsystem$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
}
const config = {
    matcher: "/:path*"
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__d7a6866b._.js.map