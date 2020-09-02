"use strict";
const loading = (show) => {
  show = show !== undefined ? show : true;
  const loader = document.getElementById('table-loading');
  if (show) {
    if (document.getElementsByClassName('table-loading').length == 0) {
      const loader = document.getElementById('table-loading');
    }
  } else {
    const loader = document.getElementById('loading');
    loader.remove();
  }
};