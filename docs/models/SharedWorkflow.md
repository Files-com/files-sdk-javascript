# SharedWorkflow

## Example SharedWorkflow Object

```
{
  "id": 1,
  "name": "example",
  "description": "example",
  "submission_revision": "example",
  "form_fields": [
    {
      "id": 1,
      "label": "Sample Label",
      "required": true,
      "help_text": "Help Text",
      "field_type": "text",
      "options_for_select": [
        "red",
        "green",
        "blue"
      ],
      "default_option": "red",
      "form_field_set_id": 1
    }
  ]
}
```

* `id` (int64): Shared Workflow ID.
* `name` (string): Name displayed to recipients.
* `description` (string): Description displayed to recipients.
* `submission_revision` (string): Revision required when submitting a Shared Workflow run.
* `form_fields` (array(object)): Current custom questions in display order.

---

## List Shared Workflows

```
await SharedWorkflow.list()
```


### Parameters

* `cursor` (string): Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
* `per_page` (int64): Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
* `sort_by` (object): If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are .

---

## Show Shared Workflow

```
await SharedWorkflow.find(id)
```


### Parameters

* `id` (int64): Required - Shared Workflow ID.

---

## Show a Shared Workflow run started by the recipient

```
await SharedWorkflow.findRun(id,
run_id)
```


### Parameters

* `id` (int64): Required - Shared Workflow ID.
* `run_id` (int64): Required - ID of the run returned by the Shared Workflow submission.

---

## Run a Shared Workflow

```
const shared_workflow = await SharedWorkflow.find(id)

await shared_workflow.runWorkflow({
  'submission_revision': "submission_revision",
  'submission_id': "submission_id",
  'file_path': "file_path",
})
```

### Parameters

* `id` (int64): Required - Shared Workflow ID.
* `submission_revision` (string): Required - Revision returned when opening the Shared Workflow.
* `submission_id` (string): Required - Client-generated UUID used to retry the same submission without starting another run.
* `file_path` (string): Required - Path of a file the recipient can read, including a file uploaded to a Snapshot created for this workflow.

### Example Response

```json
{
  "id": 1,
  "completed_at": "2000-01-01T01:00:00Z",
  "created_at": "2000-01-01T01:00:00Z",
  "status": "success",
  "automation_id": 1,
  "automation_version_id": 1,
  "version": 1,
  "workspace_id": 1,
  "initiating_user_id": 1,
  "initiating_interface": "example",
  "cancel_requested_at": "2000-01-01T01:00:00Z",
  "retry_at": "2000-01-01T01:00:00Z",
  "retried_at": "2000-01-01T01:00:00Z",
  "retried_in_run_id": 1,
  "retry_of_run_id": 1,
  "rerun_of_run_id": 1,
  "rerun_from_node_id": "example",
  "runtime": 1.0,
  "successful_operations": 1,
  "failed_operations": 1,
  "definition": "example",
  "application_actions": "example",
  "node_states": "example",
  "execution_nodes": [
    {
      "node_id": "example",
      "node_type": "example",
      "status": "example",
      "run_stage": "example",
      "reused": true,
      "successful_operations": 1,
      "failed_operations": 1,
      "started_at": "2000-01-01T01:00:00Z",
      "completed_at": "2000-01-01T01:00:00Z",
      "duration_ms": 1,
      "inputs": [
        "example"
      ],
      "outputs": "example",
      "input_items": "example",
      "output_items": "example",
      "item_refs": [
        "example"
      ],
      "item_values": [
        "example"
      ]
    }
  ],
  "journal_url": "example",
  "status_messages_url": "https://www.example.com/log_file.txt"
}
```
