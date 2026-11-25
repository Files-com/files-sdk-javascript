# AutomationApplicationAction

## Example AutomationApplicationAction Object

```
{
  "application": {
    "key": "example",
    "name": "example",
    "brand": "example"
  },
  "key": "example",
  "name": "example",
  "description": "example",
  "fingerprint": "example",
  "fields": [
    "example"
  ],
  "output": "example",
  "origins": [
    "example"
  ],
  "authentication": [
    "example"
  ]
}
```

* `application` (AutomationApplication): Application that provides the action.
* `key` (string): Stable action key within the application.
* `name` (string): Action display name.
* `description` (string): What the action does.
* `fingerprint` (string): Fingerprint of the action contract shown to the author.
* `fields` (array(object)): Normalized input fields.
* `output` (object): Normalized output schema.
* `origins` (array(string)): HTTPS origins supported by this action.
* `authentication` (array(object)): Authentication types accepted by this action.
