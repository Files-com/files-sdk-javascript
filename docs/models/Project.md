# Project

## Example Project Object

```
{
  "id": 1,
  "global_access": "none"
}
```

* `id` (int64): Project ID
* `global_access` (string): Global access settings

---

## List Projects

```
await Project.list({
  'per_page': 1,
})
```


### Parameters

* `cursor` (string): Used for pagination.  Send a cursor value to resume an existing list from the point at which you left off.  Get a cursor from an existing list via either the X-Files-Cursor-Next header or the X-Files-Cursor-Prev header.
* `per_page` (int64): Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).

---

## Show Project

```
await Project.find(id)
```


### Parameters

* `id` (int64): Required - Project ID.

---

## Create Project

```
await Project.create({
  'global_access': "global_access",
})
```


### Parameters

* `global_access` (string): Required - Global permissions.  Can be: `none`, `anyone_with_read`, `anyone_with_full`.

---

## Update Project

```
const [project] = await Project.list()

await project.update({
  'global_access': "global_access",
})
```

### Parameters

* `id` (int64): Required - Project ID.
* `global_access` (string): Required - Global permissions.  Can be: `none`, `anyone_with_read`, `anyone_with_full`.

### Example Response

```json
{
  "id": 1,
  "global_access": "none"
}
```

---

## Delete Project

```
const [project] = await Project.list()

await project.delete()
```

### Parameters

* `id` (int64): Required - Project ID.

