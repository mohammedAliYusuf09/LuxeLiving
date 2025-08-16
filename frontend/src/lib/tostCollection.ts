// utils/toast.ts
import { toast } from 'react-toastify';

export const notify = (message: string) => toast(message);
// You can add more specific toast functions if needed
export const notifySuccess = (message: string) => toast.success(message);
export const notifyError = (message: string) => toast.error(message);