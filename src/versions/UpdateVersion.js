import React from "react";

export const UpdateVersion = () => {
  return (
    <section>
      <h1>Please refresh to get the latest version of the application.</h1>
      <button type="primary" onClick={() => document.location.reload(true)}>
        REFRESH
      </button>
    </section>
  );
};
