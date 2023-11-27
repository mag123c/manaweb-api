export class SendbirdDashBoardUserResponse {
    user_id: string;
    nickname: string;
    unread_message_count: number;
    profile_url: string;
    access_token: string;
    is_online: boolean;
    is_active: boolean;
    created_at: number;
    last_seen_at: number;
    discovery_keys: string[]
    preferred_languages: string[]
    has_ever_logged_in: boolean;
    metadata: {
        font_preference: string;
        font_color: string;
    }
}

export class SendbirdDashBoardUserListResponse {
    requireAuthForProfileImage: boolean;
    isOnline: boolean;
    userId: string;
    hasEverLoggedIn: boolean;
    isActive: boolean;
    lastSeenAt: number;
    nickname: string;
    discoveryKeys: [];
    preferredLanguages: [];
    profileUrl: string;
    createdAt: Date;
    phoneNumber: string;
    isHideMeFromFriends: boolean;
    metadata: {};
}

export class SendbirdDashBoardUserCreateResponse {
    user_id: string;
    nickname: string;
    profile_url: string;
    access_token: string;
    is_online: boolean;
    is_active: boolean;
    is_created: boolean;
    phone_number: number;
    require_auth_for_profile_image: boolean;
    session_tokens: [];
    last_seen_at: number;
    discovery_keys: [];
    preferred_languages: [];
    has_ever_logged_in: boolean;
    metadata: {
        font_preference: string;
        font_color: string;
    }
}

export class SendbirdDashBoardUserTokenResponse {    
        token: string;
        expires_at: number;    
}