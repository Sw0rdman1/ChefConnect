import React, { createContext, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ToastNotification {
    severity: 'success' | 'error' | 'warning';
    text: string;
}

interface ToastContextProps {
    showToast: (notification: ToastNotification) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

interface ToastProviderProps {
    children: React.ReactNode;
}

const { width } = Dimensions.get('window');

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
    const [toast, setToast] = useState<ToastNotification | null>(null);
    const { bottom } = useSafeAreaInsets();

    const showToast = (notification: ToastNotification) => {
        setToast(notification);
    };

    const hideToast = () => {
        setToast(null);
    };

    setTimeout(() => {
        hideToast();
    }, 5000);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toast && (
                <View style={{
                    position: 'absolute',
                    bottom: bottom + 10,
                    width: width - 60,
                    left: 30,
                    zIndex: 1000,
                    alignItems: 'center',
                    padding: 10,
                    paddingVertical: 20,
                    borderRadius: 15,
                    backgroundColor: getBackgroundColor(toast.severity)
                }}>
                    <Text style={{ color: "white", fontWeight: 600, fontSize: 18 }}>
                        {toast.text}
                    </Text>

                </View>
            )}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

const getBackgroundColor = (severity: 'success' | 'error' | 'warning') => {
    switch (severity) {
        case 'success':
            return 'rgba(76, 198, 66, 0.9)';
        case 'error':
            return 'rgba(237, 67, 55, 0.8)';
        case 'warning':
            return 'rgba(255, 255, 0, 0.8)';
        default:
            return 'rgba(128, 128, 128, 0.8)';
    }
};