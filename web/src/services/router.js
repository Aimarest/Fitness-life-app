const redirect = (path) => {
  // cambiar la ruta actual
  window.location.replace(`#${path}`);
};

const reload = (path) => {
  // refrescar la página
  window.location.reload();
};

const objToExport = {
  redirect: redirect,
  reload: reload,
};

export default objToExport;
