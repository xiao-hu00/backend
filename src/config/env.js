let ENV = 'development';

function set(env) {
  if (env) {
    ENV = env;
    return ENV;
  }
  if (window.location.hostname === 'localhost') {
    ENV = 'development';
  } else {
    ENV = 'production';
  }
}

function get() {
  return ENV;
}

export default {
  get,
  set,
};
