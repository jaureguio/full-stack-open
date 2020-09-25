import * as React from "react";

const Notification = ({ notification }) => {
  if (!notification) return null;

  const { content, type } = notification;

  return <div className={type}>{content}</div>;
}

export default Notification