# Snapshot

* `id` (int64): Snapshot ID.

---

## List Snapshots

```
await Snapshot.list({
  'per_page': 1,
})
```


### Parameters

* `cursor` (string): Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
* `per_page` (int64): Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).

---

## Show Snapshot

```
await Snapshot.find(id)
```


### Parameters

* `id` (int64): Required - Snapshot ID.

---

## Create Snapshot

```
await Snapshot.create
```


---

## Update Snapshot

```
const [snapshot] = await Snapshot.list()

await snapshot.update()
```

### Parameters

* `id` (int64): Required - Snapshot ID.


---

## Delete Snapshot

```
const [snapshot] = await Snapshot.list()

await snapshot.delete()
```

### Parameters

* `id` (int64): Required - Snapshot ID.

