# RemoteServerConfigurationFile

## Example RemoteServerConfigurationFile Object

```
{
  "id": 1,
  "permission_set": "example",
  "private_key": "example",
  "subdomain": "example",
  "root": "C:\\Users\\",
  "follow_links": true,
  "prefer_protocol": "example",
  "dns": "example",
  "proxy_all_outbound": true,
  "endpoint_override": "example",
  "log_file": "example",
  "log_level": "example",
  "log_rotate_num": 1,
  "log_rotate_size": 1,
  "override_max_concurrent_jobs": 1,
  "graceful_shutdown_timeout": 1,
  "transfer_rate_limit": "example",
  "auto_update_policy": "example",
  "api_token": "example",
  "port": 1,
  "hostname": "example",
  "public_key": "example",
  "status": "example",
  "server_host_key": "example",
  "config_version": "example"
}
```

* `id` (int64): The remote server ID of the agent
* `permission_set` (string): The permission set for the agent ['read_write', 'read_only', 'write_only']
* `private_key` (string): The private key for the agent
* `subdomain` (string): Files.com subdomain site name
* `root` (string): The root directory for the agent
* `follow_links` (boolean): Follow symlinks when traversing directories
* `prefer_protocol` (string): Preferred network protocol ['udp', 'tcp'] (default udp)
* `dns` (string): DNS lookup method ['auto','doh','system'] (default auto)
* `proxy_all_outbound` (boolean): Proxy all outbound traffic through files.com proxy server
* `endpoint_override` (string): Custom site endpoint URL
* `log_file` (string): Log file name and location
* `log_level` (string): Log level for the agent logs ['debug', 'info', 'warn', 'error', 'fatal'] (default info)
* `log_rotate_num` (int64): Log route for agent logs. (default 5)
* `log_rotate_size` (int64): Log route size in MB for agent logs. (default 20)
* `override_max_concurrent_jobs` (int64): Maximum number of concurrent jobs (default 500)
* `graceful_shutdown_timeout` (int64): Graceful shutdown timeout in seconds (default 15)
* `transfer_rate_limit` (string): File transfer (upload/download) rate limit
 `<limit>-<period>`, with the given periods:
* 'S': second
* 'M': minute
* 'H': hour
* 'D': day
Examples:
* 5 requests/second: '5-S'
* 10 requests/minute: '10-M'
* 1000 requests/hour: '1000-H'
* 2000 requests/day: '2000-D'
* `auto_update_policy` (string): Auto update policy ['manual_trigger', 'critical_only', 'always', 'never'] (default critical_only)
* `api_token` (string): Files Agent API Token
* `port` (int64): Incoming port for files agent connections
* `hostname` (string): 
* `public_key` (string): public key
* `status` (string): either running or shutdown
* `server_host_key` (string): 
* `config_version` (string): agent config version
