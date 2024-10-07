# cds-plugin-demo-amqp

> 🚧 **WORK IN PROGRESS. FOR DEMO PURPOSES ONLY. NOT READY FOR PRODUCTIVE USAGE.**

This is a CAP plugin that allows to connect a CAP project to an AMQP broker.

To use it in your CAP project, simply clone this repo and add it as a dependency:

```json
{
    ...
    "dependencies": {
        ...
        "cds-plugin-demo-amqp": "file:<path-to-this-repo>"
    }
}

```

Then specify the queue of the AMQP connection and the service name/entity you want to write the events into in the `cds` section of the `package.json` (of your CAP project). The `broker` property is for logging purposes only:

```json
{
    ...
    "cds": {
        "requires": {
            "amqp": {
                "broker": "AEM",
                "queue": "<queue-name>",
                "service": "<service>.<entity>"
            }
        
        }
    }
}
```

> Make sure the data model of the entity exactly matches the structure of the messages you will receive.

Create a `.env` file in your CAP project containing further (secret) connection details, e.g.:

```text
SOLACE_AMQP_PROTOCOL="amqps"
SOLACE_AMQP_HOST="<URL>"
SOLACE_AMQP_PORT="<PORT"
SOLACE_AMQP_USERNAME="<USERNAME>"
SOLACE_AMQP_PASSWORD="<PASSWORD>"
```

You can now start the CAP server, which should wait for incoming messages (see logs).
