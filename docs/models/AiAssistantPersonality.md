# AiAssistantPersonality

## Example AiAssistantPersonality Object

```
{
  "id": 1,
  "workspace_id": 1,
  "system_prompt": "Respond as a concise operations assistant.",
  "use_by_default": true,
  "apply_to_all_workspaces": true,
  "created_at": "2000-01-01T01:00:00Z",
  "updated_at": "2000-01-01T01:00:00Z"
}
```

* `id` (int64): AI Assistant Personality ID.
* `workspace_id` (int64): Workspace ID. `0` means the default workspace.
* `system_prompt` (string): System prompt injected into the in-app AI Assistant.
* `use_by_default` (boolean): Whether this personality is the default personality for the Workspace.
* `apply_to_all_workspaces` (boolean): If true, this default-workspace personality can apply to users in all workspaces.
* `created_at` (date-time): Creation time.
* `updated_at` (date-time): Last update time.

---

## List Ai Assistant Personalities

```
await AiAssistantPersonality.list
```


### Parameters

* `cursor` (string): Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
* `per_page` (int64): Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
* `sort_by` (object): If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `workspace_id` and `id`.
* `filter` (object): If set, return records where the specified field is equal to the supplied value. Valid fields are `workspace_id`.

---

## Show Ai Assistant Personality

```
await AiAssistantPersonality.find(id)
```


### Parameters

* `id` (int64): Required - Ai Assistant Personality ID.

---

## Create Ai Assistant Personality

```
await AiAssistantPersonality.create({
  'apply_to_all_workspaces': false,
  'system_prompt': "Respond as a concise operations assistant.",
  'use_by_default': false,
  'workspace_id': 0,
})
```


### Parameters

* `apply_to_all_workspaces` (boolean): If true, this default-workspace personality can apply to users in all workspaces.
* `system_prompt` (string): Required - System prompt injected into the in-app AI Assistant.
* `use_by_default` (boolean): Whether this personality is the default personality for the Workspace.
* `workspace_id` (int64): Workspace ID. `0` means the default workspace.

---

## Update Ai Assistant Personality

```
const ai_assistant_personality = await AiAssistantPersonality.find(id)

await ai_assistant_personality.update({
  'apply_to_all_workspaces': false,
  'system_prompt': "Respond as a concise operations assistant.",
  'use_by_default': false,
  'workspace_id': 0,
})
```

### Parameters

* `id` (int64): Required - Ai Assistant Personality ID.
* `apply_to_all_workspaces` (boolean): If true, this default-workspace personality can apply to users in all workspaces.
* `system_prompt` (string): System prompt injected into the in-app AI Assistant.
* `use_by_default` (boolean): Whether this personality is the default personality for the Workspace.
* `workspace_id` (int64): Workspace ID. `0` means the default workspace.

### Example Response

```json
{
  "id": 1,
  "workspace_id": 1,
  "system_prompt": "Respond as a concise operations assistant.",
  "use_by_default": true,
  "apply_to_all_workspaces": true,
  "created_at": "2000-01-01T01:00:00Z",
  "updated_at": "2000-01-01T01:00:00Z"
}
```

---

## Delete Ai Assistant Personality

```
const ai_assistant_personality = await AiAssistantPersonality.find(id)

await ai_assistant_personality.delete()
```

### Parameters

* `id` (int64): Required - Ai Assistant Personality ID.

