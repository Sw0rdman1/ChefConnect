interface User {
    id: string;
    email: string;
    displayName: string;
    profilePicture?: string;
    updated_at: Date;
}

export default User;