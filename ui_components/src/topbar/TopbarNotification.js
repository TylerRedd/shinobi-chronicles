// @flow

import type { MissionNotificationType, NotificationType } from "../notificationSchema.js";

type TopbarNotificationProps = {|
    +notification: NotificationType | MissionNotificationType,
    +closeNotification: (number) => void,
|};

export function TopbarNotification({
    notification,
    closeNotification
}: TopbarNotificationProps): React$Node {
    switch(notification.type) {
        case "training":
        case "training_complete":
        case "stat_transfer":
            return <TrainingNotification
                notification={notification}
                closeNotification={closeNotification}
            />;
        case "specialmission":
        case "specialmission_complete":
        case "specialmission_failed":
            return <SpecialMissionNotification
                notification={notification}
                closeNotification={closeNotification}
            />;
        default:
            break;
    }

    const timeRemainingDisplay = formatTimeRemaining(
        calculateTimeRemaining(notification.created, notification.duration)
    );

    return (
        <>
            {notification.type === "mission" &&
                <a href={notification.action_url}
                   className={(notification.duration > 0) ? "topbar_notification_wrapper has_duration" : "topbar_notification_wrapper"}
                   data-content={notification.message}
                   data-time={timeRemainingDisplay}
                >
                    <svg className="topbar_notification_svg" width="40" height="40" viewBox="0 0 100 100">
                        <polygon points="6,50 50,94 94,50 50,6" strokeWidth="8px" stroke="#5d5c4b" fill="#52466a" />
                        <polygon points="6,50 50,94 94,50 50,6" strokeWidth="2px" stroke="#000000" fill="#52466a" />
                        <text x="10%" y="80%" className="topbar_notification_mission">{notification.mission_rank.charAt(0)}</text>
                        <text x="35%" y="65%" className="topbar_notification_mission">{notification.mission_rank.charAt(0)}</text>
                        <text x="60%" y="50%" className="topbar_notification_mission">{notification.mission_rank.charAt(0)}</text>
                    </svg>
                </a>
            }
            {notification.type === "mission_team" &&
                <a href={notification.action_url}
                    className={(notification.duration > 0) ? "topbar_notification_wrapper has_duration" : "topbar_notification_wrapper"}
                    data-content={notification.message}
                    data-time={timeRemainingDisplay}
                >
                    <svg className="topbar_notification_svg" width="40" height="40" viewBox="0 0 100 100">
                        <polygon points="6,50 50,94 94,50 50,6" strokeWidth="8px" stroke="#5d5c4b" fill="#52466a" />
                        <polygon points="6,50 50,94 94,50 50,6" strokeWidth="2px" stroke="#000000" fill="#52466a" />
                        <text x="31%" y="74%" className="topbar_notification_mission_team">{notification.mission_rank.charAt(0)}</text>
                    </svg>
                </a>
            }
            {notification.type === "mission_clan" &&
                <a href={notification.action_url}
                    className={(notification.duration > 0) ? "topbar_notification_wrapper has_duration" : "topbar_notification_wrapper"}
                    data-content={notification.message}
                    data-time={timeRemainingDisplay}
                >
                    <svg className="topbar_notification_svg" width="40" height="40" viewBox="0 0 100 100">
                        <polygon points="6,50 50,94 94,50 50,6" strokeWidth="8px" stroke="#5d5c4b" fill="#52466a" />
                        <polygon points="6,50 50,94 94,50 50,6" strokeWidth="2px" stroke="#000000" fill="#52466a" />
                        <text x="30%" y="72%" className="topbar_notification_mission_clan">{notification.mission_rank.charAt(0)}</text>
                    </svg>
                </a>
            }
            {notification.type === "rank" &&
                <a href={notification.action_url}
                   className={(notification.duration > 0) ? "topbar_notification_wrapper has_duration" : "topbar_notification_wrapper"}
                   data-content={notification.message}
                   data-time={timeRemainingDisplay}
                >
                    <svg className="topbar_notification_svg" width="40" height="40" viewBox="0 0 100 100">
                        <polygon points="6,50 50,94 94,50 50,6" strokeWidth="8px" stroke="#5d5c4b" fill="#B09A65" />
                        <polygon points="6,50 50,94 94,50 50,6" strokeWidth="2px" stroke="#000000" fill="#B09A65" />
                        <image className="topbar_notification_icon" height="40" width="40" x="30%" y="27%" href="images/v2/icons/levelup.png" />
                    </svg>
                </a>
            }
            {notification.type === "system" &&
                <a href={notification.action_url}
                   className={(notification.duration > 0) ? "topbar_notification_wrapper has_duration" : "topbar_notification_wrapper"}
                   data-content={notification.message}
                   data-time={timeRemainingDisplay}
                >
                    <svg className="topbar_notification_svg" width="40" height="40" viewBox="0 0 100 100">
                        <polygon points="6,50 50,94 94,50 50,6" strokeWidth="8px" stroke="#5d5c4b" fill="#ae5576" />
                        <polygon points="6,50 50,94 94,50 50,6" strokeWidth="2px" stroke="#000000" fill="#ae5576" />
                        <text x="40%" y="70%" className="topbar_notification_important">!</text>
                    </svg>
                </a>
            }
            {notification.type === "warning" &&
                <a href={notification.action_url}
                   className={(notification.duration > 0) ? "topbar_notification_wrapper has_duration" : "topbar_notification_wrapper"}
                   data-content={notification.message}
                   data-time={timeRemainingDisplay}
                >
                    <svg className="topbar_notification_svg" width="40" height="40" viewBox="0 0 100 100">
                        <polygon points="6,50 50,94 94,50 50,6" strokeWidth="8px" stroke="#5d5c4b" fill="#ae5576" />
                        <polygon points="6,50 50,94 94,50 50,6" strokeWidth="2px" stroke="#000000" fill="#ae5576" />
                        <text x="40%" y="70%" className="topbar_notification_important">!</text>
                    </svg>
                </a>
            }
            {notification.type === "report" &&
                <a href={notification.action_url}
                   className={(notification.duration > 0) ? "topbar_notification_wrapper_report has_duration" : "topbar_notification_wrapper_report"}
                   data-content={notification.message}
                   data-time={timeRemainingDisplay}
                >
                    <svg className="topbar_notification_svg" width="40" height="40" viewBox="0 0 100 100">
                        <polygon points="6,50 50,94 94,50 50,6" strokeWidth="8px" stroke="#5d5c4b" fill="#ae5576" />
                        <polygon points="6,50 50,94 94,50 50,6" strokeWidth="2px" stroke="#000000" fill="#ae5576" />
                        <text x="40%" y="70%" className="topbar_notification_important">!</text>
                    </svg>
                </a>
            }
            {notification.type === "battle" &&
                <a href={notification.action_url}
                   className={(notification.duration > 0) ? "topbar_notification_wrapper has_duration" : "topbar_notification_wrapper"}
                   data-content={notification.message}
                   data-time={timeRemainingDisplay}
                >
                    <svg className="topbar_notification_svg" width="40" height="40" viewBox="0 0 100 100">
                        <polygon points="6,50 50,94 94,50 50,6" strokeWidth="8px" stroke="#4c1f1f" fill="#eb4648" />
                        <polygon points="6,50 50,94 94,50 50,6" strokeWidth="2px" stroke="#000000" fill="#eb4648" />
                        <image className="topbar_notification_icon" height="85" width="85" x="5%" y="12%" href="images/v2/icons/combat.png" />
                    </svg>
                </a>
            }
            {notification.type === "challenge" &&
                <a href={notification.action_url}
                   className={(notification.duration > 0) ? "topbar_notification_wrapper has_duration" : "topbar_notification_wrapper"}
                   data-content={notification.message}
                   data-time={timeRemainingDisplay}
                >
                    <svg className="topbar_notification_svg" width="40" height="40" viewBox="0 0 100 100">
                        <polygon points="6,50 50,94 94,50 50,6" strokeWidth="8px" stroke="#5d5c4b" fill="#B09A65" />
                        <polygon points="6,50 50,94 94,50 50,6" strokeWidth="2px" stroke="#000000" fill="#B09A65" />
                        <text x="40%" y="70%" className="topbar_notification_important">!</text>
                    </svg>
                </a>
            }
            {notification.type === "team" &&
                <a href={notification.action_url}
                   className={(notification.duration > 0) ? "topbar_notification_wrapper has_duration" : "topbar_notification_wrapper"}
                   data-content={notification.message}
                   data-time={timeRemainingDisplay}
                >
                    <svg className="topbar_notification_svg" width="40" height="40" viewBox="0 0 100 100">
                        <polygon points="6,50 50,94 94,50 50,6" strokeWidth="8px" stroke="#5d5c4b" fill="#5964a6" />
                        <polygon points="6,50 50,94 94,50 50,6" strokeWidth="2px" stroke="#000000" fill="#5964a6" />
                        <text x="40%" y="70%" className="topbar_notification_important">!</text>
                    </svg>
                </a>
            }
            {notification.type === "marriage" &&
                <a href={notification.action_url}
                   className={(notification.duration > 0) ? "topbar_notification_wrapper has_duration" : "topbar_notification_wrapper"}
                   data-content={notification.message}
                   data-time={timeRemainingDisplay}
                >
                    <svg className="topbar_notification_svg" width="40" height="40" viewBox="0 0 100 100">
                        <polygon points="6,50 50,94 94,50 50,6" strokeWidth="8px" stroke="#5d5c4b" fill="#5964a6" />
                        <polygon points="6,50 50,94 94,50 50,6" strokeWidth="2px" stroke="#000000" fill="#5964a6" />
                        <text x="40%" y="70%" className="topbar_notification_important">!</text>
                    </svg>
                </a>
            }
            {notification.type === "student" &&
                <a href={notification.action_url}
                   className={(notification.duration > 0) ? "topbar_notification_wrapper has_duration" : "topbar_notification_wrapper"}
                   data-content={notification.message}
                   data-time={timeRemainingDisplay}
                >
                    <svg className="topbar_notification_svg" width="40" height="40" viewBox="0 0 100 100">
                        <polygon points="6,50 50,94 94,50 50,6" strokeWidth="8px" stroke="#5d5c4b" fill="#5964a6" />
                        <polygon points="6,50 50,94 94,50 50,6" strokeWidth="2px" stroke="#000000" fill="#5964a6" />
                        <text x="40%" y="70%" className="topbar_notification_important">!</text>
                    </svg>
                </a>
            }
            {notification.type === "inbox" &&
                <a href={notification.action_url}
                   className={(notification.duration > 0) ? "topbar_notification_wrapper has_duration" : "topbar_notification_wrapper"}
                   data-content={notification.message}
                   data-time={timeRemainingDisplay}
                >
                    <svg className="topbar_notification_svg" width="40" height="40" viewBox="0 0 100 100">
                        <polygon points="6,50 50,94 94,50 50,6" strokeWidth="8px" stroke="#5d5c4b" fill="#5964a6" />
                        <polygon points="6,50 50,94 94,50 50,6" strokeWidth="2px" stroke="#000000" fill="#5964a6" />
                        <text x="40%" y="70%" className="topbar_notification_important">!</text>
                    </svg>
                </a>
            }
            {notification.type === "chat" &&
                <a href={notification.action_url}
                    className="topbar_notification_wrapper"
                    data-content={notification.message}
                data-time={timeRemainingDisplay}
                >
                    <svg className="topbar_notification_svg" width="40" height="40" viewBox="0 0 100 100">
                        <polygon points="6,50 50,94 94,50 50,6" strokeWidth="8px" stroke="#5d5c4b" fill="#5964a6" />
                        <polygon points="6,50 50,94 94,50 50,6" strokeWidth="2px" stroke="#000000" fill="#5964a6" />
                        <image className="topbar_notification_icon" height="40" width="40" x="30%" y="32%" href="images/v2/icons/quote_hover.png" />
                    </svg>
                    <label
                        className="topbar_close_notification"
                        onClick={(e) => {
                            e.preventDefault();
                            closeNotification(notification.notification_id);
                        }}
                    >X</label>
                </a>
            }
            {notification.type === "event" &&
                <a href={notification.action_url}
                    className={(notification.duration > 0) ? "topbar_notification_wrapper has_duration" : "topbar_notification_wrapper"}
                    data-content={notification.message}
                    data-time={timeRemainingDisplay}
                >
                    <svg className="topbar_notification_svg" width="40" height="40" viewBox="0 0 100 100">
                    <polygon points="6,50 50,94 94,50 50,6" strokeWidth="8px" stroke="#5d5c4b" fill="#38a774" />
                    <polygon points="6,50 50,94 94,50 50,6" strokeWidth="2px" stroke="#000000" fill="#38a774" />
                        <text x="40%" y="70%" className="topbar_notification_important">!</text>
                    </svg>
                </a>
            }
            {notification.type === "caravan" &&
                <a href={notification.action_url}
                    className={(notification.duration > 0) ? "topbar_notification_wrapper has_duration" : "topbar_notification_wrapper"}
                    data-content={notification.message}
                    data-time={timeRemainingDisplay}
                >
                    <svg className="topbar_notification_svg" width="40" height="40" viewBox="0 0 100 100">
                        <polygon points="6,50 50,94 94,50 50,6" strokeWidth="8px" stroke="#5d5c4b" fill="#B09A65" />
                        <polygon points="6,50 50,94 94,50 50,6" strokeWidth="2px" stroke="#000000" fill="#B09A65" />
                    <image className="topbar_notification_icon" height="45" width="45" x="28%" y="30%" href="images/map/icons/caravan.png" />
                    </svg>
                </a>
            }
            {notification.type === "raid" &&
                <a href={notification.action_url}
                    className={(notification.duration > 0) ? "topbar_notification_wrapper has_duration" : "topbar_notification_wrapper"}
                    data-content={notification.message}
                    data-time={timeRemainingDisplay}
                >
                    <svg className="topbar_notification_svg" width="40" height="40" viewBox="0 0 100 100">
                    <polygon points="6,50 50,94 94,50 50,6" strokeWidth="8px" stroke="#4c1f1f" fill="#eb4648" />
                    <polygon points="6,50 50,94 94,50 50,6" strokeWidth="2px" stroke="#000000" fill="#eb4648" />
                        <image className="topbar_notification_icon" height="60" width="60" x="19%" y="16%" href="images/map/icons/village.png" />
                    </svg>
                </a>
            }
        </>
    )
}

function SpecialMissionNotification({
    notification,
    closeNotification
}: TopbarNotificationProps) {
    const timeRemainingDisplay = formatTimeRemaining(
        calculateTimeRemaining(notification.created, notification.duration)
    );

    return (
        <>
            {notification.type === "specialmission" &&
                <a href={notification.action_url}
                   className={(notification.duration > 0) ? "topbar_notification_wrapper has_duration" : "topbar_notification_wrapper"}
                   data-content={notification.message}
                   data-time={timeRemainingDisplay}
                >
                    <svg className="topbar_notification_svg" width="40" height="40" viewBox="0 0 100 100">
                        <polygon points="6,50 50,94 94,50 50,6" strokeWidth="8px" stroke="#5d5c4b" fill="#52466a" />
                        <polygon points="6,50 50,94 94,50 50,6" strokeWidth="2px" stroke="#000000" fill="#52466a" />
                        <text x="24%" y="65%" className="topbar_notification_specialmission">sm</text>
                    </svg>
                </a>
            }
            {notification.type === "specialmission_complete" &&
                <>
                    <a href={notification.action_url}
                       className={(notification.duration > 0) ? "topbar_notification_wrapper has_duration" : "topbar_notification_wrapper"}
                       data-content={notification.message}
                    data-time={timeRemainingDisplay}
                    onClick={(e) => {
                        e.preventDefault();
                        closeNotification(notification.notification_id, notification.action_url);
                    }}
                    >
                        <svg className="topbar_notification_svg" width="40" height="40" viewBox="0 0 100 100">
                            <polygon points="6,50 50,94 94,50 50,6" strokeWidth="8px" stroke="#5d5c4b" fill="#5964a6" />
                            <polygon points="6,50 50,94 94,50 50,6" strokeWidth="2px" stroke="#000000" fill="#5964a6" />
                            <text x="24%" y="65%" className="topbar_notification_specialmission">sm</text>
                            <circle cx="75" cy="25" r="12" fill="#31e1a1" />
                        </svg>
                        <label
                            className="topbar_close_notification"
                            onClick={(e) => {
                                e.preventDefault();
                                closeNotification(notification.notification_id);
                            }}
                        >X</label>
                    </a>
                </>
            }
            {notification.type === "specialmission_failed" &&
                <>
                    <a href={notification.action_url}
                       className={(notification.duration > 0) ? "topbar_notification_wrapper has_duration" : "topbar_notification_wrapper"}
                       data-content={notification.message}
                    data-time={timeRemainingDisplay}
                    onClick={(e) => {
                        e.preventDefault();
                        closeNotification(notification.notification_id, notification.action_url);
                    }}
                    >
                        <svg className="topbar_notification_svg" width="40" height="40" viewBox="0 0 100 100">
                            <polygon points="6,50 50,94 94,50 50,6" strokeWidth="8px" stroke="#5d5c4b" fill="#5964a6" />
                            <polygon points="6,50 50,94 94,50 50,6" strokeWidth="2px" stroke="#000000" fill="#5964a6" />
                            <text x="24%" y="65%" className="topbar_notification_specialmission">sm</text>
                            <circle cx="75" cy="25" r="12" fill="#ff4141" />
                        </svg>
                        <label
                            className="topbar_close_notification"
                            onClick={(e) => {
                                e.preventDefault();
                                closeNotification(notification.notification_id);
                            }}
                        >X</label>
                    </a>
                </>
            }
        </>
    )
}

function TrainingNotification({
    notification,
    closeNotification
}: TopbarNotificationProps) {
    const [timeRemaining, setTimeRemaining] = React.useState(
        calculateTimeRemaining(notification.created, notification.duration)
    );

    React.useEffect(() => {
        const intervalId = setInterval(function () {
            setTimeRemaining(prevTime => prevTime - 1);
        }, 999);

        return () => clearInterval(intervalId);
    }, [timeRemaining]);

    return (
        <>
            {notification.type === "training" &&
                <a href={notification.action_url}
                   className="topbar_notification_wrapper_training"
                   data-content={notification.message}
                   data-time={formatTimeRemaining(timeRemaining)}
                >
                    <svg className="topbar_notification_svg" width="40" height="40" viewBox="0 0 100 100">
                        <polygon points="6,50 50,94 94,50 50,6" strokeWidth="8px" stroke="#5d5c4b" fill="#52466a" />
                        <polygon points="6,50 50,94 94,50 50,6" strokeWidth="2px" stroke="#000000" fill="#52466a" />
                        <image className="topbar_notification_icon" height="50" width="50" x="25.5%" y="27.5%" href="images/v2/icons/timer.png" />
                    </svg>
                </a>
            }
            {notification.type === "training_complete" &&
                <>
                    <a href={notification.action_url}
                       className="topbar_notification_wrapper_training_complete"
                       data-content={notification.message}
                    data-time={formatTimeRemaining(timeRemaining)}
                    onClick={(e) => {
                        e.preventDefault();
                        closeNotification(notification.notification_id, notification.action_url);
                    }}
                    >
                        <svg className="topbar_notification_svg" width="40" height="40" viewBox="0 0 100 100">
                            <polygon points="6,50 50,94 94,50 50,6" strokeWidth="8px" stroke="#5d5c4b" fill="#5964a6" />
                            <polygon points="6,50 50,94 94,50 50,6" strokeWidth="2px" stroke="#000000" fill="#5964a6" />
                            <image className="topbar_notification_icon" height="50" width="50" x="25.5%" y="27.5%" href="images/v2/icons/timer.png" />
                            <circle cx="75" cy="25" r="12" fill="#31e1a1" />
                        </svg>
                        <label
                            className="topbar_close_notification"
                            onClick={(e) => {
                                e.preventDefault();
                                closeNotification(notification.notification_id);
                            }}
                        >X</label>
                    </a>
                </>
            }
            {notification.type === "stat_transfer" &&
                <a href={notification.action_url}
                   className="topbar_notification_wrapper stat_transfer"
                   data-content={`${notification.message}: ${formatTimeRemaining(timeRemaining)} remaining`}
                >
                    <svg className="topbar_notification_svg" width="40" height="40" viewBox="0 0 100 100">
                        <polygon points="6,50 50,94 94,50 50,6" strokeWidth="8px" stroke="#5d5c4b" fill="#52466a" />
                        <polygon points="6,50 50,94 94,50 50,6" strokeWidth="2px" stroke="#000000" fill="#52466a" />
                        <image className="topbar_notification_icon" height="50" width="50" x="25.5%" y="27.5%" href="images/v2/icons/timer.png" />
                    </svg>
                </a>
            }
        </>
    )
}

// Utilities
function calculateTimeRemaining(created, duration) {
    const currentTimeTicks = new Date().getTime();
    return (created + duration) - currentTimeTicks / 1000;
}

function formatTimeRemaining(seconds) {
    if (seconds <= 0) {
        return "Complete";
    }
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    seconds = Math.floor(seconds % 60);

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return (hours > 0) ? formattedHours + ':' + formattedMinutes + ':' + formattedSeconds : formattedMinutes + ':' + formattedSeconds;
}
