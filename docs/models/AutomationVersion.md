# AutomationVersion

## Example AutomationVersion Object

```
{
  "id": 1,
  "automation_id": 1,
  "workspace_id": 1,
  "version": 1,
  "created_at": "2000-01-01T01:00:00Z",
  "user_id": 1,
  "username": "example",
  "api_key_id": 1,
  "definition": {
    "schema_version": 1,
    "nodes": [
      {
        "id": "trigger",
        "type": "trigger_manual"
      },
      {
        "id": "create_reports",
        "type": "create_folder",
        "config": {
          "destinations": [
            "reports/"
          ]
        }
      }
    ],
    "edges": [
      {
        "from": "trigger",
        "to": "create_reports"
      }
    ]
  },
  "application_actions": "example"
}
```

* `id` (int64): Automation revision ID.
* `automation_id` (int64): ID of the Automation that owns this revision.
* `workspace_id` (int64): Workspace that owns the Automation. Zero is the Default Workspace.
* `version` (int64): Revision number within the Automation.
* `created_at` (date-time): Time the revision was saved.
* `user_id` (int64): ID of the user who saved the revision, when available.
* `username` (string): Username recorded when the revision was saved, when available.
* `api_key_id` (int64): ID of the API key used to save the revision, when available.
* `definition` (object): Saved Automation v2 graph definition. Included when retrieving a single revision.
* `application_actions` (object): Normalized application action metadata keyed by pinned action fingerprint.

---

## List Automation Versions

```
await AutomationVersion.list({
  'automation_id': 1,
})
```


### Parameters

* `cursor` (string): Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
* `per_page` (int64): Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
* `sort_by` (object): If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are .
* `automation_id` (int64): Required - ID of the Automation that owns this revision.

---

## Show Automation Version

```
await AutomationVersion.find(id)
```


### Parameters

* `id` (int64): Required - Automation Version ID.

---

## Restore an Automation v2 definition as a new current version

```
const automation_version = await AutomationVersion.find(id)

await automation_version.restore()
```

### Parameters

* `id` (int64): Required - Automation Version ID.

### Example Response

```json
{
  "id": 1,
  "workspace_id": 1,
  "always_serialize_jobs": true,
  "always_overwrite_size_matching_files": true,
  "automation": "create_folder",
  "converted_automation_id": 1,
  "deleted": true,
  "description": "example",
  "definition": {
    "schema_version": 1,
    "nodes": [
      {
        "id": "trigger",
        "type": "trigger_manual"
      },
      {
        "id": "create_reports",
        "type": "create_folder",
        "config": {
          "destinations": [
            "reports/"
          ]
        }
      }
    ],
    "edges": [
      {
        "from": "trigger",
        "to": "create_reports"
      }
    ]
  },
  "application_actions": "example",
  "destination_replace_from": "example",
  "destination_replace_to": "example",
  "destinations": [
    "destination"
  ],
  "disabled": true,
  "exclude_pattern": "path/to/exclude/*",
  "import_urls": [
    {
      "name": "users.json",
      "url": "https://example.com/users",
      "method": "post",
      "headers": {
        "Content-Type": "application/json"
      },
      "content": {
        "group": "support"
      }
    }
  ],
  "inbound_email_address": "example-automation-abc123@inbox.files.com",
  "flatten_destination_structure": true,
  "group_ids": [
    1,
    2
  ],
  "ignore_locked_folders": true,
  "interval": "week",
  "last_modified_at": "2000-01-01T01:00:00Z",
  "legacy_folder_matching": false,
  "name": "example",
  "original_automation_id": 1,
  "overwrite_files": true,
  "path": "example",
  "path_time_zone": "Eastern Time (US & Canada)",
  "version": 1,
  "recurring_day": 25,
  "recurring_days": [
    1,
    15
  ],
  "schedule_id": 1,
  "retry_on_failure_interval_in_minutes": 60,
  "retry_on_failure_number_of_attempts": 10,
  "schedule": {
    "days_of_week": [
      0,
      2,
      4
    ],
    "times_of_day": [
      "06:30",
      "14:30"
    ],
    "time_zone": "Eastern Time (US & Canada)"
  },
  "human_readable_schedule": "Triggered every Monday, Wednesday at 6:30 AM,\n  2:30 PM Eastern Time (US & Canada) TZ",
  "schedule_days_of_week": [
    0,
    2,
    4
  ],
  "schedule_interval_minutes": 15,
  "schedule_times_of_day": [
    "06:30",
    "14:30"
  ],
  "schedule_time_zone": "Eastern Time (US & Canada)",
  "source": "example",
  "shared_trigger_user_ids": [
    1
  ],
  "shared_trigger_group_ids": [
    1
  ],
  "shared_trigger_partner_ids": [
    1
  ],
  "sync_ids": [
    1,
    2
  ],
  "trigger_actions": [
    "create"
  ],
  "trigger": "daily",
  "user_id": 1,
  "user_ids": [
    1,
    2
  ],
  "value": {
    "limit": "1"
  },
  "webhook_url": "https://app.files.com/api/webhooks/abc123",
  "holiday_region": "us_dc"
}
```
