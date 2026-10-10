import { useEffect, useState, useContext } from "react";
import { Bell } from "lucide-react";

import { authContext } from "../context/authContext.jsx";
import {
  getNotifications,
  markAllNotificationsRead,
} from "../api/notification.js";
import { getSocket, disconnectSocket } from "../api/socket.js";

const POLL_INTERVAL_MS = 60_000;

const NotificationBell = () => {
  const { user } = useContext(authContext);
  const [items, setItems] = useState([]);
  const [unread, setUnread] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!user){
        disconnectSocket();
        return;
    }

    let cancelled = false;

    const load = async () => {
      const res = await getNotifications({ limit: 10 });
      if (cancelled || !res.ok) return;
      setItems(res.data.data);
      setUnread(res.data.meta.unreadCount);
    };

    load();
    const socket = getSocket();
    socket.connect();
    const timer = setInterval(load, POLL_INTERVAL_MS);

    const onNew = (notification) => {
      setItems((current) => [notification, ...current]);
      setUnread((count) => count + 1);
    };
    socket.on("notification.created", onNew); // whenever notification.created is emitted, update the state

    return () => {
      cancelled = true;
      clearInterval(timer);
      socket.off("notification.created", onNew);
    };
  }, [user?.id]);

  if (!user) return null;

  const toggle = async () => {
    const wasOpen = open;
    setOpen(!wasOpen);

    if (!wasOpen && unread > 0) {
      setUnread(0); // optimistic; the next poll corrects it if this fails
      setItems((current) =>
        current.map((n) => (n.readAt ? n : { ...n, readAt: new Date().toISOString() }))
      );
      await markAllNotificationsRead();
    }
  };

  return (
    <div className="bell">
      <button
        className="bell__button"
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-label={`Notifications, ${unread} unread`}
      >
        <Bell aria-hidden="true" size={20} />
        {unread > 0 ? (
          <span className="bell__badge">{unread > 9 ? "9+" : unread}</span>
        ) : null}
      </button>

      {open ? (
        <ul className="bell__dropdown">
          {items.length === 0 ? (
            <li className="bell__empty">Nothing yet</li>
          ) : (
            items.map((n) => (
              <li key={n._id} className={n.readAt ? "bell__item" : "bell__item is-unread"}>
                <strong>{n.title}</strong>
                <p>{n.message}</p>
                <time dateTime={n.createdAt}>
                  {new Date(n.createdAt).toLocaleString()}
                </time>
              </li>
            ))
          )}
        </ul>
      ) : null}
    </div>
  );
};

export default NotificationBell;
