import React from 'react'
import NotificationsClient from './NotificationsClient'
import { pageMetadata } from '@/lib/utils';

export const metadata = pageMetadata.notifications;

const page = () => {
  return (
    <NotificationsClient />
  )
}

export default page
