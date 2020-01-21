export function isMobile() {
  if (!process.browser) {
    return false;
  }

  return global.innerWidth <= 840;
}

export function isLoggedIn() {
  if (
    localStorage.getItem("token") &&
    localStorage.getItem("token").length > 10
  ) {
    return true;
  }
  return false;
}
