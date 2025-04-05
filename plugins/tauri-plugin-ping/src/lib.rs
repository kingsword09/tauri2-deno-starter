use tauri::{
  plugin::{Builder, TauriPlugin},
  Manager, Runtime,
};

pub use models::*;

#[cfg(desktop)]
mod desktop;
#[cfg(mobile)]
mod mobile;

mod commands;
mod error;
mod models;

pub use error::{Error, Result};

#[cfg(desktop)]
use desktop::Ping;
#[cfg(mobile)]
use mobile::Ping;

/// Extensions to [`tauri::App`], [`tauri::AppHandle`] and [`tauri::Window`] to access the ping APIs.
pub trait PingExt<R: Runtime> {
  fn ping(&self) -> &Ping<R>;
}

impl<R: Runtime, T: Manager<R>> crate::PingExt<R> for T {
  fn ping(&self) -> &Ping<R> {
    self.state::<Ping<R>>().inner()
  }
}

/// Initializes the plugin.
pub fn init<R: Runtime>() -> TauriPlugin<R> {
  Builder::new("ping")
    .invoke_handler(tauri::generate_handler![commands::ping])
    .setup(|app, api| {
      #[cfg(mobile)]
      let ping = mobile::init(app, api)?;
      #[cfg(desktop)]
      let ping = desktop::init(app, api)?;
      app.manage(ping);
      Ok(())
    })
    .build()
}
