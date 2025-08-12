import { Fragment, Suspense } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import RootLayout from "./components/layout/layout";
import { APIProvider } from "@vis.gl/react-google-maps";

export default function App() {
  return (
    <Suspense>
      <APIProvider
        apiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}
        onLoad={() => console.log("Googlemaps API loaded")}
      >
        <RootLayout>
          <Fragment>
            <Outlet />
            <ScrollRestoration />
          </Fragment>
        </RootLayout>
      </APIProvider>
    </Suspense>
  );
}
