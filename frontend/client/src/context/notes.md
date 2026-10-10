```
Request 1:  POST /auth/login     { email, password }   → server: "correct, hello Asha"
Request 2:  GET  /courses/abc123                       → server: "...and who are you?"
```


```
── REGISTER / LOGIN ────────────────────────────────────────────┐
│                                                                │
│  Browser                               Server                  │
│    │  POST /auth/login { email, pw }     │                     │
│    │ ──────────────────────────────────► │                     │
│    │                                     │ User.findOne(email) │
│    │                                     │ bcrypt.compare(pw)  │
│    │                                     │ jwt.sign({id,role}) │
│    │  200 { user, token }                │                     │
│    │ ◄────────────────────────────────── │                     │
│    │                                                           │
│    │ localStorage.setItem("token", ...)   ← the ONLY place it lives
└────────────────────────────────────────────────────────────────┘

┌── EVERY REQUEST AFTERWARDS ────────────────────────────────────┐
│    │  GET /auth/me                                             │
│    │  Authorization: Bearer eyJ...        ← axios interceptor  │
│    │ ──────────────────────────────────► │                     │
│    │                                     │ protect middleware: │
│    │                                     │  split " " → token  │
│    │                                     │  jwt.verify(secret) │
│    │                                     │  ├ bad sig  → 401   │
│    │                                     │  ├ expired  → 401   │
│    │                                     │  └ ok → req.userId  │
│    │  200 { user }                       │      → next()       │
│    │ ◄────────────────────────────────── │                     │
└────────────────────────────────────────────────────────────────┘

┌── PAGE REFRESH ────────────────────────────────────────────────┐
│  React memory wiped → user = null → but localStorage survived  │
│  useEffect: read token+user → show optimistically              │
│           → GET /auth/me → server confirms → trust that        │
│           → if it fails → clear everything, back to /login     │
└────────────────────────────────────────────────────────────────┘
```





