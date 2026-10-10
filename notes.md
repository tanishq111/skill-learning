```
        User                              Course
   ┌──────────────────┐            ┌─────────────────────┐
   │ name             │            │ title               │
   │ email  (unique)  │            │ slug   (unique)     │
   │ password (hash)  │   ◄────────┤ instructor  (ref)   │   ← ownership lives HERE
   │ role             │            │ category / level    │
   │   student        │            │ priceInr            │
   │   instructor     │            │ status draft|publish│
   │   admin          │            │ rating              │
   │ enrolledCourses[]├────────► ? │                     │   ← declared, NEVER written
   └──────────────────┘            └─────────────────────┘

   Notification  →  does not exist
   Enrollment    →  does not exist
```





```
    User ──owns──► Course ◄──targets── Enrollment ──belongs to──► User (student)
      ▲                                     │
      │                                     │ triggers
      └──────── recipient ──── Notification ◄┘
```


```

A) EMBED ON USER                 B) EMBED ON COURSE            C) SEPARATE COLLECTION
   user.enrolledCourses[]           course.students[]              Enrollment
   ┌──────────────┐                 ┌──────────────┐               ┌──────────────┐
   │ [id, id, id] │                 │ [id, id, id] │               │ student  ref │
   └──────────────┘                 └──────────────┘               │ course   ref │
                                                                   │ enrolledAt   │
   "my courses" = 1 read            "who's enrolled" = 1 read      │ status       │
   "who's enrolled" = scan ALL      ARRAY GROWS UNBOUNDED          │ progress     │
   no enrolment date                10k students = 10k ObjectIds   │ amountPaid   │
   no progress, no payment          in one document, loaded        └──────────────┘
                                    on EVERY course read            both directions indexed
```