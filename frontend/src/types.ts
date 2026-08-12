// Shared TypeScript types for the project

export interface UserProfile {
    id: string;
    firstName: string;
    lastName: string | null;
    email: string;
    phoneNumber: string;
    roles: Role[];
    createdAt: string;
}

export type Role = 'admin' | 'user';

export interface Service {
    id: number;
    name: string;
    price: number;
    features?: string[];
    description?: string;
    videoType?: 'reel' | 'landscape';
}

export interface Order {
    id: string;
    orderDate: string;
    serviceId: string;
    serviceName: string;
    servicePrice: number;
    nameAndLastName: string;
    eMail: string;
    phoneNumber: string | null;
    companyName: string | null;
    companyOIB: string | null;
    website: string | null;
    customerRequest: string | null;
    isR1Receipt: boolean;
    stripePaymentIntentId: string | null;
    createdAt: string;
}

export interface GalleryVideo {
    id: string;
    vimeoId: string;
    clientName: string;
    type?: 'reel' | 'landscape';
}

export type ServicePrice = number | null;

export interface OrderFormData {
    nameAndLastName: string;
    eMail: string;
    phoneNumber: string;
    website: string;
    customerRequest: string;
    isR1Reciept: boolean;
    companyName: string;
    companyOIB: string;
}

// Stripe types
export interface StripePaymentModalProps {
    formData: OrderFormData;
    files: File[];
    serviceId: number;
    amount: number;
    onSuccess: () => void;
    onCancel: () => void;
}

export interface OrderData {
    isoDate: string;
}

// Admin state types
export type SidebarProps = {
    sidebarShown: boolean;
    currentPath: string;
    onHamburgerClick: () => void;
    closeSidebar: () => void;
    logout: () => void;
};
