# Portfolio Admin System — Updated Documentation

---

## 1. Architecture Overview

```
┌────────────────────────────┐
│        Portfolio UI         │
│   (Public + Admin Panel)   │
└─────────────┬──────────────┘
              │
              ▼
┌────────────────────────────┐
│    Netlify Functions API    │
│ (Auth, CRUD, Analytics)     │
└─────────────┬──────────────┘
              │
              ▼
┌────────────────────────────┐
│       MongoDB Atlas         │
│   (projects, profile,       │
│    tools, analytics)        │
└────────────────────────────┘

Images → Cloudinary (CDN)
```

---

## 2. Data Flow Overview

### 2.1 Public Portfolio Flow

```
User opens website
        │
        ▼
Frontend calls /projects-get
        │
        ▼
API returns ONLY published projects
        │
        ▼
Images loaded from Cloudinary CDN
        │
        ▼
Visitor tracking triggered (once/session)
```

---

### 2.2 Admin Flow

```
Admin Login
   │
   ▼
POST /auth-login
   │
   ▼
JWT Token returned
   │
   ▼
Stored in localStorage
   │
   ▼
All admin requests use Authorization header
```

---

## 3. Core Feature Logic

---

## 3.1 Draft / Publish System

### Flow

```
Admin creates project
        │
        ▼
Default status = "draft"
        │
        ▼
Project NOT visible in public API
        │
        ▼
Admin toggles status → "published"
        │
        ▼
Now visible in /projects-get
```

### Logic

```
IF status == "published"
    SHOW in portfolio
ELSE
    HIDE from public
```

---

## 3.2 Visitor Tracking Logic

### Flow

```
User visits site
        │
        ▼
Check sessionStorage
        │
        ├── Already visited → STOP
        │
        └── Not visited
                │
                ▼
        Call /track-visit
                │
                ▼
        Increment today's visitor count
```

---

## 3.3 Project Click Tracking

### Flow

```
User clicks project card
        │
        ▼
POST /track-click
        │
        ▼
Increment project.clicks
        │
        ▼
Update analytics.projectClicks
```

---

## 3.4 Project View Tracking

### Flow

```
User opens project detail page
        │
        ▼
POST /track-view
        │
        ▼
Increment project.views
```

---

## 4. Database Structure

---

### 4.1 Projects Collection

Fields:

* projectId
* name
* shortDesc
* category
* year
* coverImg (Cloudinary URL)
* gallery (array of URLs)
* techStack
* description
* features
* challenges
* status (draft | published)
* views
* clicks
* order
* timestamps

---

### 4.2 Analytics Collection

Fields:

* date
* visitors
* projectClicks (object map)

---

### 4.3 Profile Collection

Fields:

* name
* typingTexts
* location
* email
* phone
* social links
* profileImage (Cloudinary)
* cvFile (Cloudinary)

---

### 4.4 Tools Collection

Fields:

* name
* icon (Cloudinary URL)
* order

---

## 5. API Design

### Public Endpoints

* GET /projects-get → only published
* GET /project-get
* GET /profile-get
* GET /tools-get

---

### Admin Endpoints (JWT Protected)

* POST /auth-login
* POST /project-create
* PUT /project-update
* DELETE /project-delete
* PUT /project-status
* POST /tool-create
* PUT /tool-update
* DELETE /tool-delete
* PUT /profile-update

---

### Analytics Endpoints

* POST /track-visit
* POST /track-click
* POST /track-view

---

## 6. Image Handling (Cloudinary)

### Flow

```
Admin uploads image
        │
        ▼
Frontend sends file to Cloudinary API
        │
        ▼
Cloudinary returns URL
        │
        ▼
URL stored in MongoDB
        │
        ▼
Frontend renders directly from CDN
```

---

## 7. Security Flow

```
Admin request
      │
      ▼
Check Authorization header
      │
      ▼
Verify JWT
      │
      ├── Valid → Allow
      │
      └── Invalid → Reject (401)
```

---

## 8. Performance Design

* Images served via CDN (Cloudinary)
* Public endpoints lightweight
* No file streaming from backend
* Reduced serverless load

---

## 9. Key Advantages

* Simple architecture
* Fast image delivery
* Real analytics tracking
* CMS-like control via admin panel
* Scalable for portfolio-level traffic

---

## 10. Limitations

* Serverless cold start delay possible
* Basic analytics (not real-time heavy tracking)
* No role-based access (single admin)

---

## 11. Final Summary

This system functions as:

* Portfolio Website
* Lightweight CMS
* Analytics Tracker

Without unnecessary complexity like GridFS.

It balances:

* Performance
* Simplicity
* Real-world feature implementation

---

END OF DOCUMENT
