const { Logging } = require("@google-cloud/logging");
const config = require("./../../config");

const log = (message) => {
    const { projectId, logName, instanceId, zone } = JSON.parse(
        config.googleLogData
    );

    const logger = new Logging({
        projectId: projectId,
    });

    const log = logger.log(logName);
    const metadata = {
        resource: {
            type: "gce_instance",
            labels: {
                zone: zone,
                instance_id: instanceId,
                project_id: projectId,
            },
        },
    };

    const entry = log.entry(metadata, message);

    // send it and forget it
    log.write(entry);
};

module.exports = { log };
