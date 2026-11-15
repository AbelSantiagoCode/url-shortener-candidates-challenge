# Application Flows

These diagrams show how requests cross the frontend, API, application, domain, and infrastructure boundaries.

## Create a short URL

```mermaid
sequenceDiagram
    actor User
    participant Form as Home URL form
    participant Route as Home route action
    participant Handler as createUrlAction
    participant API as Backend HTTP API
    participant UC as CreateUrlUseCase
    participant Domain as URL domain
    participant DB as Prisma / PostgreSQL
    participant Cache as Redis

    User->>Form: Submit original URL
    Form->>Route: POST with _intent=createUrl
    Route->>Handler: Dispatch intent with FormData
    Handler->>API: POST /api/urls
    API->>UC: CreateUrlInput
    UC->>Domain: Validate URL and generate Base62 code
    UC->>DB: Insert URL record
    DB-->>UC: Persisted URL
    UC->>Cache: Cache destination for 1 hour
    UC-->>API: CreateUrlResult
    API-->>Handler: CreateUrlResponse
    Handler-->>Form: Short URL result
```

## Load the dashboard

```mermaid
sequenceDiagram
    actor User
    participant Browser
    participant Route as URLs route loader
    participant Page as UrlsPage
    participant API as Backend HTTP API
    participant UC as GetUrlStatisticsUseCase
    participant DB as Prisma / PostgreSQL

    User->>Browser: Navigate to /urls
    Browser->>Route: Start route loader
    Route-->>Browser: Return pending URL-list promise
    Browser->>Page: Render dashboard shell
    Page-->>User: Show dashboard spinner
    Route->>API: GET /api/urls
    API->>UC: Get statistics
    UC->>DB: Query URL records
    DB-->>UC: URLs and click counts
    UC-->>API: Statistics result
    API-->>Route: URL list
    Route-->>Page: Resolve loader promise
    Page-->>User: Render URL cards and totals
```

## Redirect and track a click

```mermaid
flowchart TD
    A[GET /go/:shortCode] --> B[React Router route loader]
    B --> C[Backend GET /api/:shortCode]
    C --> D{Redis cache hit?}
    D -- Yes --> E[Read destination and URL ID from cache]
    D -- No --> F[Find URL by short code in PostgreSQL]
    F --> G{URL exists?}
    G -- No --> H[Return 404]
    G -- Yes --> I[Cache destination and ID for one hour]
    E --> J[Increment PostgreSQL clickCount]
    I --> J
    J --> K[HTTP 302 to original URL]
```

## Delete a short URL

```mermaid
sequenceDiagram
    actor User
    participant Button as DeleteUrlButton
    participant Route as URLs route action
    participant Handler as deleteUrlAction
    participant API as Backend HTTP API
    participant UC as DeleteUrlUseCase
    participant DB as Prisma / PostgreSQL
    participant Cache as Redis

    User->>Button: Confirm delete
    Button->>Route: POST with _intent=deleteUrl and ID
    Route->>Handler: Dispatch intent with FormData
    Handler->>API: DELETE /api/urls/:id
    API->>UC: DeleteUrlInput
    UC->>DB: Find and delete URL
    UC->>Cache: Invalidate short-code key
    UC-->>API: DeleteUrlResult
    API-->>Handler: Success
    Handler-->>Button: Deleted ID
    Button-->>User: React Router revalidates dashboard data
```
