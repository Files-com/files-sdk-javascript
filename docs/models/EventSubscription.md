# EventSubscription

## Example EventSubscription Object

```
{
  "id": 1,
  "event_channel_id": 1,
  "workspace_id": 1,
  "apply_to_all_workspaces": true,
  "name": "example",
  "enabled": true,
  "event_types": [
    "example"
  ],
  "filter": "example",
  "delivery_policy": "example",
  "event_target_ids": [
    1
  ],
  "created_at": "2000-01-01T01:00:00Z",
  "updated_at": "2000-01-01T01:00:00Z"
}
```

* `id` (int64): Event Subscription ID
* `event_channel_id` (int64): Event Channel ID
* `workspace_id` (int64): Workspace ID. 0 means the default workspace or site-wide.
* `apply_to_all_workspaces` (boolean): If true, this default-workspace subscription applies to events from all workspaces.
* `name` (string): Event Subscription name.
* `enabled` (boolean): Whether this Event Subscription can dispatch events.
* `event_types` (array(string)): Event type strings matched by this subscription. Blank means all event types.
* `filter` (object): Structured event payload filter.
* `delivery_policy` (object): Event Subscription delivery policy.
* `event_target_ids` (array(int64)): Event Target IDs this subscription sends to.
* `created_at` (date-time): Event Subscription create date/time.
* `updated_at` (date-time): Event Subscription update date/time.

---

## List Event Subscriptions

```
await EventSubscription.list
```


### Parameters

* `cursor` (string): Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
* `per_page` (int64): Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
* `sort_by` (object): If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `enabled`, `event_channel_id` or `workspace_id`.
* `filter` (object): If set, return records where the specified field is equal to the supplied value. Valid fields are `enabled`, `event_channel_id` or `workspace_id`. Valid field combinations are `[ enabled, event_channel_id ]`, `[ workspace_id, enabled ]` or `[ workspace_id, enabled, event_channel_id ]`.

---

## Show Event Subscription

```
await EventSubscription.find(id)
```


### Parameters

* `id` (int64): Required - Event Subscription ID.

---

## Create Event Subscription

```
await EventSubscription.create({
  'event_channel_id': 1,
  'workspace_id': 1,
  'apply_to_all_workspaces': true,
  'name': "example",
  'enabled': true,
  'event_types': ["example"],
  'delivery_policy': "example",
  'event_target_ids': [1],
})
```


### Parameters

* `event_channel_id` (int64): Event Channel ID
* `workspace_id` (int64): Workspace ID. 0 means the default workspace or site-wide.
* `apply_to_all_workspaces` (boolean): If true, this default-workspace subscription applies to events from all workspaces.
* `name` (string): Required - Event Subscription name.
* `enabled` (boolean): Whether this Event Subscription can dispatch events.
* `event_types` (array(string)): Event type strings matched by this subscription. Blank means all event types.
* `filter` (object): Structured event payload filter.
* `delivery_policy` (object): Event Subscription delivery policy.
* `event_target_ids` (array(int64)): Event Target IDs this subscription sends to.

---

## Update Event Subscription

```
const event_subscription = await EventSubscription.find(id)

await event_subscription.update({
  'event_channel_id': 1,
  'workspace_id': 1,
  'apply_to_all_workspaces': true,
  'name': "example",
  'enabled': true,
  'event_types': ["example"],
  'delivery_policy': "example",
  'event_target_ids': [1],
})
```

### Parameters

* `id` (int64): Required - Event Subscription ID.
* `event_channel_id` (int64): Event Channel ID
* `workspace_id` (int64): Workspace ID. 0 means the default workspace or site-wide.
* `apply_to_all_workspaces` (boolean): If true, this default-workspace subscription applies to events from all workspaces.
* `name` (string): Event Subscription name.
* `enabled` (boolean): Whether this Event Subscription can dispatch events.
* `event_types` (array(string)): Event type strings matched by this subscription. Blank means all event types.
* `filter` (object): Structured event payload filter.
* `delivery_policy` (object): Event Subscription delivery policy.
* `event_target_ids` (array(int64)): Event Target IDs this subscription sends to.

### Example Response

```json
{
  "id": 1,
  "event_channel_id": 1,
  "workspace_id": 1,
  "apply_to_all_workspaces": true,
  "name": "example",
  "enabled": true,
  "event_types": [
    "example"
  ],
  "filter": "example",
  "delivery_policy": "example",
  "event_target_ids": [
    1
  ],
  "created_at": "2000-01-01T01:00:00Z",
  "updated_at": "2000-01-01T01:00:00Z"
}
```

---

## Delete Event Subscription

```
const event_subscription = await EventSubscription.find(id)

await event_subscription.delete()
```

### Parameters

* `id` (int64): Required - Event Subscription ID.

