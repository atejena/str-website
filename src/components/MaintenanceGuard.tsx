'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import UnderConstruction from './UnderConstruction';

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  youtube?: string;
  tiktok?: string;
}

interface MaintenanceSettings {
  enabled: boolean;
  title: string;
  subtitle: string;
  showLogo: boolean;
}

interface MaintenanceGuardProps {
  maintenance: MaintenanceSettings;
  socialLinks: SocialLinks;
  hasSession: boolean;
  children: React.ReactNode;
}

/** Paths that are always accessible even during maintenance */
const BYPASS_PATHS = ['/admin', '/login', '/privacy', '/terms'];

function MaintenanceGuardInner({
  maintenance,
  socialLinks,
  hasSession,
  children,
}: MaintenanceGuardProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // If maintenance mode is OFF, render normally
  if (!maintenance.enabled) {
    return <>{children}</>;
  }

  // Always allow bypass paths (admin, login, legal pages)
  if (BYPASS_PATHS.some((p) => pathname === p || pathname.startsWith(p + '/'))) {
    return <>{children}</>;
  }

  // Allow preview mode for authenticated admins
  const isPreview = searchParams.get('preview') === 'true';
  if (isPreview && hasSession) {
    return (
      <>
        <div className="fixed top-0 left-0 right-0 z-[9998] bg-str-gold text-str-black text-center py-1 text-xs font-bold uppercase tracking-widest">
          Preview Mode
        </div>
        <div className="pt-6">{children}</div>
      </>
    );
  }

  // Show Under Construction page
  return (
    <UnderConstruction
      title={maintenance.title || 'Coming Soon'}
      subtitle={maintenance.subtitle || ''}
      showLogo={maintenance.showLogo}
      socialLinks={socialLinks}
    />
  );
}

export default function MaintenanceGuard(props: MaintenanceGuardProps) {
  return (
    <Suspense fallback={<>{props.children}</>}>
      <MaintenanceGuardInner {...props} />
    </Suspense>
  );
}
