import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import { lazy, Suspense } from 'react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

const HomePage = lazy(() => import('@/components/pages/HomePage'));
const VehiclesPage = lazy(() => import('@/components/pages/VehiclesPage'));
const VehicleDetailPage = lazy(() => import('@/components/pages/VehicleDetailPage'));
const Car3DExperiencePage = lazy(() => import('@/components/pages/Car3DExperiencePage'));
const ServicesPage = lazy(() => import('@/components/pages/ServicesPage'));
const AboutPage = lazy(() => import('@/components/pages/AboutPage'));
const ContactPage = lazy(() => import('@/components/pages/ContactPage'));

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<LoadingSpinner />}>
        <Outlet />
      </Suspense>
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "vehicles",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <VehiclesPage />
          </Suspense>
        ),
      },
      {
        path: "vehicles/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <VehicleDetailPage />
          </Suspense>
        ),
      },
      {
        path: "3d-experience",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Car3DExperiencePage />
          </Suspense>
        ),
      },
      {
        path: "services",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ServicesPage />
          </Suspense>
        ),
      },
      {
        path: "about",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: "contact",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ContactPage />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
