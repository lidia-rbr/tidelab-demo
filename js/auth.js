const demoUser = { uid: "demo-john", email: "john.doe@tidelab.demo", emailVerified: true };

export async function getIdToken() { return "static-demo-token"; }
export function getCurrentUser() { return demoUser; }
export function observeAuthState(callback) {
  queueMicrotask(() => callback(demoUser));
  return () => {};
}
export async function logoutUser() { sessionStorage.removeItem("tidelab.demo.persona"); }
export async function loginWithEmail() { return { user: demoUser }; }
export { loginWithEmail as signInWithEmail };
