// 1. Firebase Imports (v10 ESM - Browser CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    GoogleAuthProvider, 
    signOut, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { 
    getFirestore, 
    collection, 
    doc, 
    getDoc,
    getDocs, 
    setDoc, 
    deleteDoc, 
    query, 
    where 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// --- ADMIN AYARI ---
// Firebase Console -> Authentication sekmesindeki kendi UID'nizi buraya yapıştırın.
const ADMIN_UID = "DmwYv69WQVMN9iDVkaVAyZeFOzp1"; 

// 2. Firebase Configuration (Yeni)
const firebaseConfig = {
    apiKey: "AIzaSyCAlnRIcJjKP1NLup4Ou-gjTvCBKY4EOIk",
    authDomain: "bir-yonuylee.firebaseapp.com",
    projectId: "bir-yonuylee",
    storageBucket: "bir-yonuylee.firebasestorage.app",
    messagingSenderId: "536620480114",
    appId: "1:536620480114:web:52a466f00cbdb8de98f4eb"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const googleProvider = new GoogleAuthProvider();

// Add this line to force the account selection screen:
googleProvider.setCustomParameters({ prompt: 'select_account' });

const GenreTranslations = {
    "Rock": { tr: "Rock", en: "Rock" },
    "Pop": { tr: "Pop", en: "Pop" },
    "Hip Hop": { tr: "Hip Hop", en: "Hip Hop" },
    "Hip-Hop": { tr: "Hip Hop", en: "Hip Hop" },
    "Rap": { tr: "Rap", en: "Rap" },
    "R&B": { tr: "R&B", en: "R&B" },
    "Rnb": { tr: "R&B", en: "R&B" },
    "Electronic": { tr: "Elektronik", en: "Electronic" },
    "Electronica": { tr: "Elektronik", en: "Electronic" },
    "Dance": { tr: "Dans", en: "Dance" },
    "Jazz": { tr: "Caz", en: "Jazz" },
    "Blues": { tr: "Blues", en: "Blues" },
    "Classical": { tr: "Klasik", en: "Classical" },
    "Folk": { tr: "Folk", en: "Folk" },
    "Country": { tr: "Country", en: "Country" },
    "Alternative": { tr: "Alternatif", en: "Alternative" },
    "Alternative Rock": { tr: "Alternatif Rock", en: "Alternative Rock" },
    "Indie": { tr: "Indie", en: "Indie" },
    "Indie Rock": { tr: "Indie Rock", en: "Indie Rock" },
    "Indie Pop": { tr: "Indie Pop", en: "Indie Pop" },
    "Metal": { tr: "Metal", en: "Metal" },
    "Heavy Metal": { tr: "Heavy Metal", en: "Heavy Metal" },
    "Punk": { tr: "Punk", en: "Punk" },
    "Reggae": { tr: "Reggae", en: "Reggae" },
    "Soul": { tr: "Soul", en: "Soul" },
    "Funk": { tr: "Funk", en: "Funk" },
    "Disco": { tr: "Disko", en: "Disco" },
    "Techno": { tr: "Tekno", en: "Techno" },
    "House": { tr: "House", en: "House" },
    "Trance": { tr: "Trance", en: "Trance" },
    "Dubstep": { tr: "Dubstep", en: "Dubstep" },
    "Ambient": { tr: "Ambient", en: "Ambient" },
    "Latin": { tr: "Latin", en: "Latin" },
    "World": { tr: "Dünya Müziği", en: "World" },
    "Acoustic": { tr: "Akustik", en: "Acoustic" },
    "Soundtrack": { tr: "Film Müziği", en: "Soundtrack" },
    "Vocal": { tr: "Vokal", en: "Vokal" },
    "Turkish Pop": { tr: "Türkçe Pop", en: "Turkish Pop" },
    "Turkish Rock": { tr: "Türkçe Rock", en: "Turkish Rock" },
    "Turkish Rap": { tr: "Türkçe Rap", en: "Turkish Rap" },
    "Anatolian Rock": { tr: "Anadolu Rock", en: "Anatolian Rock" },
    "Arabesque": { tr: "Arabesk", en: "Arabesque" }
};

const Translations = {
    en: {
        app_title: "RateAgainst",
        nav_library: "Library",
        nav_community: "Community",
        nav_search: "Search",
        nav_stats: "Stats",
        menu_settings: "Menu & Settings",
        language_label: "Dil / Language",
        theme_label: "Tema / Theme",
        privacy_label: "Account Privacy",
        nav_data: "Data",
        export_json: "Export JSON",
        import_json: "Import JSON",
        export_4_5_star: "Favorite (4-5 Star) Tracks",
        artists: "Artists",
        search_artist: "Search artist...",
        all_artists: "All Artists",
        all_genres: "All Genres",
        all_years: "All Years",
        all_labels: "All Labels",
        no_albums: "Library is Empty",
        no_albums_desc: "Search for albums you listen to, rate them, and build your archive.",
        add_first_album: "Add Album",
        what_listening: "What are you listening to?",
        artist_disco: "Artist",
        by_album: "Album",
        search_btn: "Search",
        search_db: "Searching database...",
        music_taste: "Your Music Taste",
        unique_artists: "Artists",
        total_albums: "Albums",
        overall_avg: "Average",
        favorite_albums: "Favorite Albums",
        rated_artists: "Artists",
        music_genres: "Genres",
        image_link: "Image URL",
        apply_url: "Apply",
        search_itunes: "Search iTunes",
        album_avg: "Album Average",
        tracklist: "Tracklist",
        default_sort: "Default",
        sort_by_rating: "By Rating",
        favorite_tracks: "Favorites",
        copy_list: "Copy List",
        add_genre: "Add Genre",
        type_genres_comma: "You can add genres by <span class=\"font-bold text-gray-800 dark:text-gray-200\">separating them with commas</span> (Max 3).",
        auto_find: "Auto Find",
        add: "Add",
        update: "Update",
        remove: "Remove",
        add_new_track: "Add Track",
        unknown: "Unknown",
        independent: "Independent",
        no_cover: "No Cover",
        studio_album: "Album",
        ep: "EP",
        added_to_lib: "Added",
        added: "Updated",
        searching_artist: "Searching artist...",
        searching_albums: "Searching albums...",
        fetching_albums: "Fetching albums for",
        no_studio_albums: "No data.",
        no_results: "Not found.",
        try_full_names: "Try full names.",
        no_saved_artists: "Empty.",
        error_loading: "Error loading data.",
        no_tracks: "No tracks.",
        no_data: "No data.",
        no_rated_albums: "None.",
        no_genre_data: "No genres.",
        no_rating: "Unrated",
        albums: "albums",
        placeholder_artist: "Artist/Band name...",
        placeholder_album: "Album name...",
        toast_no_export: "Empty.",
        toast_export_success: "Downloaded.",
        toast_import_success: "added.",
        toast_import_error: "Error.",
        toast_no_5star: "None.",
        toast_copied: "Copied!",
        toast_copy_fail: "Failed.",
        toast_conn_error: "Network error.",
        toast_auto_genre_success: "genres added.",
        toast_auto_genre_info: "No new genres.",
        toast_auto_genre_fail: "Not found.",
        toast_cover_applied: "Cover changed.",
        toast_cover_found: "Found!",
        toast_cover_not_found: "Not found.",
        toast_search_error: "Error.",
        toast_edit_mode: "Edit mode.",
        toast_genre_added_already: "Already exists.",
        toast_genre_limit: "Max 3.",
        toast_select_genre: "Select.",
        toast_type_genre: "Type.",
        toast_changes_saved: "Saved",
        toast_album_added: "Added",
        toast_album_removed: "Removed",
        toast_filtered_genre: "Filter:",
        tooltip_filter_artist: "Filter by Artist",
        tooltip_filter_director: "Filter by Director",
        tooltip_filter_author: "Filter by Author",
        tooltip_filter_genre: "Filter by Genre",
        tooltip_filter_year: "Filter by Year",
        tooltip_filter_label: "Filter by Label",
        tooltip_filter_country: "Filter by Country",
        tooltip_filter_publisher: "Filter by Publisher",
        tooltip_sort_added: "Sort by Date Updated",
        tooltip_sort_year: "Sort by Release Date",
        tooltip_sort_rating: "Sort by Rating",
        tooltip_grid_normal: "Normal View",
        tooltip_grid_small: "Small View",
        tooltip_grid_xsmall: "Compact View",
        tooltip_sort_artist_rating: "Sort by Average Rating",
        tooltip_sort_artist_count: "Sort by Rated Albums Count",
        note: "Note",
        save_note: "Save Note",
        note_placeholder: "Write your notes here...",
        album_note: "Album Note",
        track_note: "Track Note",
        track_notes: "Track Notes",
        all_notes: "All Notes",
        copy_notes: "Copy Notes",
        toast_notes_copied: "Notes copied!",
        cancel: "Cancel",
        rating_dist: "Rating Distribution (Tracks)",
        decade_breakdown: "Average Score by Decade",
        listening_trends: "Average Rating Trends Over Time",
        login_prompt: "Sign in to backup and sync your library.",
        sign_in_google: "Sign in with Google",
        sign_out: "Sign Out",
        community_title: "Community & Aggregated Scores",
        tab_aggregated: "Aggregated Scores",
        tab_users: "Public Feed",
        public_account: "Public",
        private_account: "Private"
    },
    tr: {
        app_title: "RateAgainst",
        nav_library: "Kitaplığım",
        nav_community: "Topluluk",
        nav_search: "Ara",
        nav_stats: "İstatistik",
        menu_settings: "Menü & Ayarlar",
        language_label: "Dil / Language",
        theme_label: "Tema / Theme",
        privacy_label: "Hesap Gizliliği",
        nav_data: "Veri",
        export_json: "Yedek Al (JSON)",
        import_json: "Yedek Yükle",
        export_4_5_star: "Favori (4-5 Yıldız) Parçalar",
        artists: "Sanatçılar",
        search_artist: "Sanatçı ara...",
        all_artists: "Tümü (Sanatçı)",
        all_genres: "Tümü (Tür)",
        all_years: "Tümü (Yıl)",
        all_labels: "Tümü (Şirket)",
        no_albums: "Kitaplık Boş",
        no_albums_desc: "Dinlediğin albümleri bul, puanla ve arşivini oluştur.",
        add_first_album: "Albüm Ekle",
        what_listening: "Ne dinliyorsun?",
        artist_disco: "Sanatçı",
        by_album: "Albüm",
        search_btn: "Ara",
        search_db: "Veritabanı aranıyor...",
        music_taste: "Müzik Zevkin",
        unique_artists: "Sanatçı",
        total_albums: "Albüm",
        overall_avg: "Ortalama",
        favorite_albums: "Favori Albümlerin",
        rated_artists: "Sanatçılar",
        music_genres: "Türler",
        image_link: "Görsel URL",
        apply_url: "Uygula",
        search_itunes: "iTunes Ara",
        album_avg: "Albüm Ortalaması",
        tracklist: "Şarkı Listesi",
        default_sort: "Varsayılan",
        sort_by_rating: "Puana Göre",
        favorite_tracks: "Favoriler",
        copy_list: "Listeyi Kopyala",
        add_genre: "Tür Ekle",
        type_genres_comma: "Eklemek istediğiniz türleri <span class=\"font-bold text-gray-800 dark:text-gray-200\">virgülle ayırarak</span> (Maks. 3) yazabilirsiniz.",
        auto_find: "Oto Bul",
        add: "Ekle",
        update: "Güncelle",
        remove: "Kaldır",
        add_new_track: "Parça Ekle",
        unknown: "Bilinmiyor",
        independent: "Bağımsız",
        no_cover: "Yok",
        studio_album: "Albüm",
        ep: "EP",
        added_to_lib: "Eklendi",
        added: "Güncellendi",
        searching_artist: "Sanatçı aranıyor...",
        searching_albums: "Albümler aranıyor...",
        fetching_albums: "Albümler yükleniyor:",
        no_studio_albums: "Veri yok.",
        no_results: "Bulunamadı.",
        try_full_names: "Tam ad deneyin.",
        no_saved_artists: "Boş.",
        error_loading: "Hata.",
        no_tracks: "Parça yok.",
        no_data: "Veri yok.",
        placeholder_artist: "Sanatçı/grup adı yazın...",
        placeholder_album: "Albüm adı yazın...",
        toast_no_export: "Boş.",
        toast_export_success: "İndirildi.",
        toast_import_success: "eklendi.",
        toast_import_error: "Hata.",
        toast_no_5star: "Yok.",
        toast_copied: "Kopyalandı!",
        toast_copy_fail: "Başarısız.",
        toast_conn_error: "Ağ hatası.",
        toast_auto_genre_success: "tür eklendi.",
        toast_auto_genre_info: "Yeni tür yok.",
        toast_auto_genre_fail: "Bulunamadı.",
        toast_cover_applied: "Kapak değişti.",
        toast_cover_found: "Bulundu!",
        toast_cover_not_found: "Bulunamadı.",
        toast_search_error: "Hata.",
        toast_edit_mode: "Düzenleme modu.",
        toast_genre_added_already: "Zaten var.",
        toast_genre_limit: "Maks. 3",
        toast_select_genre: "Seçiniz.",
        toast_type_genre: "Yazınız.",
        toast_changes_saved: "Kaydedildi",
        toast_album_added: "Eklendi",
        toast_album_removed: "Silindi",
        toast_filtered_genre: "Filtre:",
        tooltip_filter_artist: "Sanatçılara Göre Filtrele",
        tooltip_filter_director: "Yönetmene Göre Filtrele",
        tooltip_filter_author: "Yazarlara Göre Filtrele",
        tooltip_filter_genre: "Türlere Göre Filtrele",
        tooltip_filter_year: "Yıllara Göre Filtrele",
        tooltip_filter_label: "Şirkete Göre Filtrele",
        tooltip_filter_country: "Ülkelere Göre Filtrele",
        tooltip_filter_publisher: "Yayınevine Göre Filtrele",
        tooltip_sort_added: "Güncelleme Tarihine Göre Sırala",
        tooltip_sort_year: "Çıkış Tarihine Göre Sırala",
        tooltip_sort_rating: "Puanına Göre Sırala",
        tooltip_grid_normal: "Normal Görünüm",
        tooltip_grid_small: "Küçük Görünüm",
        tooltip_grid_xsmall: "Çok Küçük Görünüm",
        tooltip_sort_artist_rating: "Ortalama Puana Göre Sırala",
        tooltip_sort_artist_count: "Puanlanan Albüm Sayısına Göre Sırala",
        note: "Not",
        save_note: "Notu Kaydet",
        note_placeholder: "Notlarınızı buraya yazın...",
        album_note: "Albüm Notu",
        track_note: "Şarkı Notu",
        track_notes: "Şarkı Notları",
        all_notes: "Tüm Notlar",
        copy_notes: "Notları Kopyala",
        toast_notes_copied: "Notlar kopyalandı!",
        albums: "albüm",
        cancel: "İptal",
        rating_dist: "Puan Dağılımı (Parçalar)",
        decade_breakdown: "Dönemlere Göre Ortalama Puan",
        listening_trends: "Aylara Göre Puanlama Eğilimi",
        login_prompt: "Arşivinizi yedeklemek ve senkronize etmek için giriş yapın.",
        sign_in_google: "Google ile Giriş Yap",
        sign_out: "Çıkış Yap",
        community_title: "Topluluk & Puanlar",
        tab_aggregated: "Genel Ortalamalar",
        tab_users: "Kamuoyu Akışı",
        public_account: "Açık",
        private_account: "Gizli"
    }
};

const AppState = {
    isAdmin: false, // Admin kontrolü için eklendi
    library: [], currentView: 'home', currentModalAlbum: null, isSearching: false,
    globalGridSize: localStorage.getItem('birYonuyleGlobalGridSize') || 'small',
    gridSize: localStorage.getItem('birYonuyleGridSize') || 'small',
    cinemaGridSize: localStorage.getItem('cinemaGridSize') || 'small',
    literatureGridSize: localStorage.getItem('literatureGridSize') || 'small',
    sortBy: localStorage.getItem('birYonuyleSortBy') || 'dateAdded',
    sortDirection: localStorage.getItem('birYonuyleSortDirection') || 'desc',
    homeSortBy: localStorage.getItem('birYonuyleHomeSortBy') || 'dateAdded',
    homeSortDirection: localStorage.getItem('birYonuyleHomeSortDirection') || 'desc',
    statsArtistSortBy: localStorage.getItem('birYonuyleStatsSortBy') || 'rating',
    statsArtistSortDirection: localStorage.getItem('birYonuyleStatsSortDirection') || 'desc',
    language: localStorage.getItem('birYonuyleLang') || 'tr',
    modalTrackSort: localStorage.getItem('birYonuyleModalTrackSort') || 'default', 
    isPrivate: false,
    filterGroup: '', filterGenre: '', filterYear: '', filterLabel: '',
    currentAllNotesRawText: '',
    communityTab: 'aggregated'
};

function t(key) { return Translations[AppState.language][key] || key; }

function tGenre(genreString) {
    if (!genreString) return '';
    const normalized = genreString.trim();
    for (let key in GenreTranslations) {
        if (key.toLowerCase() === normalized.toLowerCase() || GenreTranslations[key].tr.toLowerCase() === normalized.toLowerCase()) {
            return GenreTranslations[key][AppState.language];
        }
    }
    return normalized;
}

const Utils = {
    escapeHTML(str) {
        if (!str) return '';
        return str.toString().replace(/[&<>'"]/g, tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag));
    },
    debounce(func, wait) {
        let timeout; return function(...args) { clearTimeout(timeout); timeout = setTimeout(() => func(...args), wait); };
    },
    formatDateEN(dateStr) { return dateStr; }
};

function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if(!container) return;
    const toast = document.createElement('div');
    const colors = { success: 'bg-green-600', error: 'bg-red-600', info: 'bg-gray-800 dark:bg-gray-200 text-white dark:text-black' };
    const textColor = type === 'info' ? 'text-white dark:text-black' : 'text-white';
    toast.className = `${colors[type]} ${textColor} px-4 py-3 rounded-2xl shadow-xl text-sm font-bold transform transition-all duration-300 -translate-y-10 opacity-0 flex items-center justify-center gap-2 mx-auto w-max`;
    let icon = type === 'success' ? 'check-circle' : (type === 'error' ? 'warning-circle' : 'info');
    toast.innerHTML = `<i class="ph-fill ph-${icon} text-lg"></i> <span>${Utils.escapeHTML(message)}</span>`;
    container.appendChild(toast);
    requestAnimationFrame(() => requestAnimationFrame(() => toast.classList.remove('-translate-y-10', 'opacity-0')));
    setTimeout(() => { toast.classList.add('-translate-y-10', 'opacity-0'); setTimeout(() => toast.remove(), 300); }, 2500);
}

const app = {
    isEditMode: false,
    currentDropdownType: null,
    currentNoteTarget: null,
    draggedGenreIndex: null,

    isKünyeLocked: true,

    toggleKünyeEdit() {
        this.isKünyeLocked = !this.isKünyeLocked;
        this.applyKünyeLockState();
    },

    applyKünyeLockState() {
        const locked = this.isKünyeLocked;

        const updateBtns = (selector, colorClass, hoverClass, isLocked) => {
            document.querySelectorAll(selector).forEach(btn => {
                const isMob = btn.closest('.md\\:hidden');
                const padding = isMob ? 'px-2.5 py-1.5' : 'px-3 py-2';
                if(isLocked) {
                    btn.innerHTML = '<i class="ph-fill ph-lock-key text-lg"></i>';
                    btn.className = `${selector.replace('.','')} bg-gray-100 dark:bg-gray-800 text-gray-500 ${hoverClass} ${padding} rounded-full text-sm font-bold shadow-md cursor-pointer transition-colors`;
                } else {
                    btn.innerHTML = '<i class="ph-fill ph-lock-key-open text-lg"></i>';
                    btn.className = `${selector.replace('.','')} ${colorClass} hover:text-gray-500 ${padding} rounded-full text-sm font-bold shadow-md cursor-pointer transition-colors`;
                }
            });
        };

        // 1. MÜZİK
        ['album-title', 'album-artist', 'album-year', 'album-label', 'album-country', 'album-genre', 'custom-cover-url']
            .forEach(id => { const el = document.getElementById(id); if (el) el.readOnly = locked; });
        updateBtns('.kunye-edit-btn-album', 'bg-primary/10 text-primary', 'hover:text-primary', locked);
        const autoBtn = document.getElementById('auto-fetch-genre-btn');
        if(autoBtn) { if(locked) autoBtn.classList.add('hidden'); else autoBtn.classList.remove('hidden'); }

        // 2. SİNEMA
        ['cinema-title', 'cinema-director', 'cinema-year', 'cinema-genre', 'cinema-country', 'cinema-duration', 'cinema-poster']
            .forEach(id => { const el = document.getElementById(id); if (el) el.readOnly = locked; });
        updateBtns('.kunye-edit-btn-cinema', 'bg-purple-500/10 text-purple-600', 'hover:text-purple-600', locked);

        // 3. EDEBİYAT
        ['literature-title', 'literature-author', 'literature-year', 'literature-publisher', 'literature-pages', 'literature-genre', 'literature-translator', 'literature-country', 'literature-cover']
            .forEach(id => { const el = document.getElementById(id); if (el) el.readOnly = locked; });
        updateBtns('.kunye-edit-btn-literature', 'bg-primary/10 text-primary', 'hover:text-primary', locked);
    },

    getTextColorByRating(rating) {
        const avg = parseFloat(rating) || 0;
        if (avg >= 4.5) return 'text-[#1E3A8A]'; 
        if (avg >= 4.0) return 'text-[#064E3B]'; 
        if (avg >= 3.5) return 'text-[#15803D]'; 
        if (avg >= 3.0) return 'text-[#16A34A]'; 
        if (avg >= 2.0) return 'text-[#CA8A04]'; 
        if (avg >= 1.5) return 'text-[#EA580C]'; 
        if (avg > 0) return 'text-[#991B1B]'; 
        return 'text-gray-300 dark:text-gray-600';
    },

    getBadgeColorByRating(rating) {
        const avg = parseFloat(rating) || 0;
        if (avg >= 4.5) return 'bg-[#1E3A8A] text-white'; 
        if (avg >= 4.0) return 'bg-[#064E3B] text-white'; 
        if (avg >= 3.5) return 'bg-[#15803D] text-white'; 
        if (avg >= 3.0) return 'bg-[#16A34A] text-white'; 
        if (avg >= 2.0) return 'bg-[#CA8A04] text-white'; 
        if (avg >= 1.5) return 'bg-[#EA580C] text-white'; 
        if (avg > 0) return 'bg-[#991B1B] text-white'; 
        return 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400';
    },

    getThemeByRating(rating) {
        const avg = parseFloat(rating) || 0;
        let bottomBgClass, borderColorClass, titleColorClass, subTextColorClass, genreBgClass, circleClass;

        if (avg >= 4.5) { 
            bottomBgClass = 'bg-[#1E3A8A]'; 
            borderColorClass = 'border-[#1E3A8A] shadow-[#1E3A8A]/30';
            titleColorClass = 'text-white'; subTextColorClass = 'text-white/80';
            genreBgClass = 'bg-black/20 text-white'; circleClass = 'bg-black/25 text-white border-white/30';
        } else if (avg >= 4.0) { 
            bottomBgClass = 'bg-[#064E3B]'; 
            borderColorClass = 'border-[#064E3B] shadow-[#064E3B]/30';
            titleColorClass = 'text-white'; subTextColorClass = 'text-white/80';
            genreBgClass = 'bg-black/20 text-white'; circleClass = 'bg-black/25 text-white border-white/30';
        } else if (avg >= 3.5) { 
            bottomBgClass = 'bg-[#15803D]'; 
            borderColorClass = 'border-[#15803D] shadow-[#15803D]/30';
            titleColorClass = 'text-white'; subTextColorClass = 'text-white/80';
            genreBgClass = 'bg-black/20 text-white'; circleClass = 'bg-black/25 text-white border-white/30';
        } else if (avg >= 3.0) { 
            bottomBgClass = 'bg-[#16A34A]'; 
            borderColorClass = 'border-[#16A34A] shadow-[#16A34A]/30';
            titleColorClass = 'text-white'; subTextColorClass = 'text-white/80';
            genreBgClass = 'bg-black/20 text-white'; circleClass = 'bg-black/25 text-white border-white/30';
        } else if (avg >= 2.0) { 
            bottomBgClass = 'bg-[#CA8A04]'; 
            borderColorClass = 'border-[#CA8A04] shadow-[#CA8A04]/30';
            titleColorClass = 'text-white'; subTextColorClass = 'text-white/80';
            genreBgClass = 'bg-black/20 text-white'; circleClass = 'bg-black/25 text-white border-white/30';
        } else if (avg >= 1.5) { 
            bottomBgClass = 'bg-[#EA580C]'; 
            borderColorClass = 'border-[#EA580C] shadow-[#EA580C]/30';
            titleColorClass = 'text-white'; subTextColorClass = 'text-white/80';
            genreBgClass = 'bg-black/20 text-white'; circleClass = 'bg-black/25 text-white border-white/30';
        } else if (avg > 0) { 
            bottomBgClass = 'bg-[#991B1B]'; 
            borderColorClass = 'border-[#991B1B] shadow-[#991B1B]/30';
            titleColorClass = 'text-white'; subTextColorClass = 'text-white/80';
            genreBgClass = 'bg-black/20 text-white'; circleClass = 'bg-black/25 text-white border-white/30';
        } else { 
            bottomBgClass = 'bg-white dark:bg-surfaceHover'; borderColorClass = 'border-lightBorder dark:border-gray-800';
            titleColorClass = 'text-gray-900 dark:text-white'; subTextColorClass = 'text-gray-500 dark:text-gray-400';
            genreBgClass = 'bg-lightBg dark:bg-white/10 text-gray-700 dark:text-gray-300'; circleClass = 'bg-lightBg text-gray-500 border-lightBorder dark:bg-darker dark:text-gray-500 dark:border-gray-800';
        }

        return { bottomBgClass, borderColorClass, titleColorClass, subTextColorClass, genreBgClass, circleClass };
    },
    
    generateStarsHTML(currentRating, functionName) {
        let html = '<div class="flex items-center gap-1">';
        for(let i=1; i<=5; i++) {
            const isFull = currentRating >= i;
            const isHalf = currentRating >= i - 0.5 && currentRating < i;
            
            let starIcon = 'ph-star text-gray-300 dark:text-gray-600';
            if (isFull) starIcon = `ph-fill ph-star ${this.getTextColorByRating(currentRating)}`;
            else if (isHalf) starIcon = `ph-fill ph-star-half ${this.getTextColorByRating(currentRating)}`;

            const leftVal = i - 0.5;
            const rightVal = i;
            
            html += `
            <div class="relative w-8 h-8 transition-transform hover:scale-110 active:scale-90 flex items-center justify-center">
                <div class="absolute left-0 top-0 w-1/2 h-full z-10 cursor-pointer" onclick="app.${functionName}(${currentRating === leftVal ? 0 : leftVal})"></div>
                <div class="absolute right-0 top-0 w-1/2 h-full z-10 cursor-pointer" onclick="app.${functionName}(${currentRating === rightVal ? 0 : rightVal})"></div>
                <i class="ph ${starIcon} text-3xl pointer-events-none"></i>
            </div>`;
        }
        html += '</div>';
        return html;
    },

    generateTrackStarsHTML(trRating, idx) {
        let stars = `<div class="flex items-center star-container flex-shrink-0 bg-white dark:bg-darker border border-lightBorder dark:border-gray-700 shadow-sm rounded-full px-1.5 py-0.5 gap-px">`;
        for(let i=1; i<=5; i++) {
            const isFull = trRating >= i;
            const isHalf = trRating >= i - 0.5 && trRating < i;
            
            let starIcon = 'ph-star text-gray-300 dark:text-gray-600';
            if (isFull) starIcon = `ph-fill ph-star ${this.getTextColorByRating(trRating)}`;
            else if (isHalf) starIcon = `ph-fill ph-star-half ${this.getTextColorByRating(trRating)}`;

            const leftVal = i - 0.5;
            const rightVal = i;
            
            stars += `
            <div class="relative w-3.5 h-3.5 transition-transform hover:scale-110 active:scale-90 flex items-center justify-center">
                <div class="absolute left-0 top-0 w-1/2 h-full z-10 cursor-pointer" onclick="app.rateTrack(${idx}, ${trRating === leftVal ? 0 : leftVal})"></div>
                <div class="absolute right-0 top-0 w-1/2 h-full z-10 cursor-pointer" onclick="app.rateTrack(${idx}, ${trRating === rightVal ? 0 : rightVal})"></div>
                <i class="ph ${starIcon} text-[10px] pointer-events-none"></i>
            </div>`;
        }
        stars += '</div>';
        return stars;
    },

    saveToLocal() {
        localStorage.setItem('birYonuyle_library', JSON.stringify(AppState.library || []));
        localStorage.setItem('birYonuyle_cinema', JSON.stringify(AppState.cinemaLibrary || []));
        localStorage.setItem('birYonuyle_literature', JSON.stringify(AppState.literatureLibrary || []));
    },

    loadFromLocal() {
        try {
            AppState.library = JSON.parse(localStorage.getItem('birYonuyle_library')) || [];
            AppState.cinemaLibrary = JSON.parse(localStorage.getItem('birYonuyle_cinema')) || [];
            AppState.literatureLibrary = JSON.parse(localStorage.getItem('birYonuyle_literature')) || [];
        } catch (e) {
            console.error("Tarayıcıdan veri okunurken hata:", e);
        }
    },
    isNoteEditMode: false,
    chartInstances: {},
    currentCinemaRating: 0,
    currentLiteratureRating: 0,
    
    init() {
        // Eğer linkin sonunda #admin varsa, body'e özel bir class ekle
        if (window.location.hash === '#admin') {
            document.body.classList.add('show-login');
        }

        this.loadFromLocal(); // <-- Sayfa açılır açılmaz tarayıcıdaki verileri yükle
        this.updateLanguageUI();
        this.updateThemeIcon();
        this.debouncedSidebarSearch = Utils.debounce((e) => this.filterSidebarArtists(e.target.value), 300);
        this.setGlobalGridSize(AppState.globalGridSize);
        this.updateSortClasses();
        if (typeof this.updateHomeSortClasses === 'function') this.updateHomeSortClasses();
        this.showView('home');
        this.updateSearchPlaceholder();
        this.updateModalTrackSortButtons();
        this.initEmailAuth();

        // Firebase Auth Listener
        onAuthStateChanged(auth, async (user) => {
            const loggedOutView = document.getElementById('auth-logged-out');
            const loggedInView = document.getElementById('auth-logged-in');
            const avatarImg = document.getElementById('user-avatar');
            const nameEl = document.getElementById('user-name');
            const emailEl = document.getElementById('user-email');
            const headerAvatarContainer = document.getElementById('header-user-avatar-container');
            const authContainer = document.getElementById('auth-container'); 

            // 1. ADMIN KONTROLÜ VE ARAYÜZ KİLİDİ (Ziyaretçi vs Admin class ataması)
            if (user && user.uid === ADMIN_UID) {
                AppState.isAdmin = true;
                document.body.classList.add('is-admin');
                document.body.classList.remove('is-visitor');
            } else {
                AppState.isAdmin = false;
                document.body.classList.add('is-visitor');
                document.body.classList.remove('is-admin');
            }

            // 2. PROFİL MENÜSÜ GÖRÜNÜMÜ
            if (user) {
                if(loggedOutView) loggedOutView.classList.add('hidden');
                if(authContainer) authContainer.classList.add('hidden');
                if(loggedInView) {
                    loggedInView.classList.remove('hidden');
                    loggedInView.classList.add('flex');
                }
                                
                if(avatarImg) avatarImg.src = user.photoURL || 'https://placehold.co/100x100/d17b38/ffffff?text=' + (user.displayName ? user.displayName.charAt(0) : 'U');
                if(nameEl) nameEl.textContent = user.displayName || 'User';
                if(emailEl) emailEl.textContent = user.email || '';
                
                if(headerAvatarContainer) {
                    headerAvatarContainer.innerHTML = `<img src="${user.photoURL || 'https://placehold.co/100x100/d17b38/ffffff?text=U'}" class="w-full h-full object-cover">`;
                }

                await this.loadUserProfile(user);
            } else {
                if(loggedOutView) loggedOutView.classList.remove('hidden');
                if(authContainer) authContainer.classList.remove('hidden');
                if(loggedInView) {
                    loggedInView.classList.add('hidden');
                    loggedInView.classList.remove('flex');
                }
                
                if(headerAvatarContainer) {
                    headerAvatarContainer.innerHTML = `<i class="ph-bold ph-list text-xl text-primary"></i>`;
                }
            }

            // 3. Verileri herkesin (ziyaretçilerin de) görmesi için loadData çağrısı
            this.loadData();
        });

        document.addEventListener('click', (e) => {
            const dd = document.getElementById('custom-dropdown');
            if(dd && !dd.contains(e.target) && !e.target.closest('[onclick^="app.openDropdown"]')) {
                this.closeDropdown();
            }
        });
    },

    async loadUserProfile(user) {
        try {
            const userDocRef = doc(db, 'users', user.uid);
            const userSnap = await getDoc(userDocRef);
            const nameEl = document.getElementById('user-name');
            const nickInput = document.getElementById('profile-nickname-input');

            if (userSnap.exists()) {
                const data = userSnap.data();
                AppState.isPrivate = data.isPrivate || false;
                if(nameEl) nameEl.textContent = data.displayName || user.displayName || 'User';
                if(nickInput) nickInput.value = data.displayName || user.displayName || '';
            } else {
                AppState.isPrivate = false;
                const defaultName = user.displayName || 'User';
                await setDoc(userDocRef, {
                    displayName: defaultName,
                    photoURL: user.photoURL || '',
                    email: user.email || '',
                    isPrivate: false,
                    createdAt: new Date().toISOString()
                });
                if(nameEl) nameEl.textContent = defaultName;
                if(nickInput) nickInput.value = defaultName;
            }
            this.updatePrivacyUI();
        } catch (e) {
            console.error("Profil yüklenirken hata:", e);
        }
    },

    async togglePrivacy() {
        const user = auth.currentUser;
        if (!user) {
            showToast("Giriş yapmalısınız.", "error");
            return;
        }

        AppState.isPrivate = !AppState.isPrivate;
        this.updatePrivacyUI();

        try {
            await setDoc(doc(db, 'users', user.uid), {
                isPrivate: AppState.isPrivate
            }, { merge: true });

            // Update all local library items privacy status in Firestore
            const q = query(collection(db, 'bir_yonuyle_data'), where('user_id', '==', user.uid));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(async (docSnap) => {
                await setDoc(doc(db, 'bir_yonuyle_data', docSnap.id), { isPrivate: AppState.isPrivate }, { merge: true });
            });

            showToast(`Hesap ${AppState.isPrivate ? t('private_account') : t('public_account')} olarak ayarlandı.`, "info");
        } catch (e) {
            console.error("Gizlilik güncellenirken hata:", e);
        }
    },

    updatePrivacyUI() {
        const btn = document.getElementById('privacy-btn');
        const icon = document.getElementById('privacy-icon');
        if (btn) {
            btn.textContent = AppState.isPrivate ? t('private_account') : t('public_account');
            btn.className = AppState.isPrivate 
                ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-3 py-1 rounded-full text-xs font-bold transition-colors"
                : "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-3 py-1 rounded-full text-xs font-bold transition-colors";
        }
        if (icon) {
            icon.className = AppState.isPrivate ? "ph ph-lock-key text-lg text-red-500" : "ph ph-globe text-lg text-green-500";
        }
    },

    toggleSidebar(forceState) {
        const sidebar = document.getElementById('right-sidebar');
        const backdrop = document.getElementById('sidebar-backdrop');
        if(!sidebar || !backdrop) return;
        
        const isOpen = forceState !== undefined ? forceState : sidebar.classList.contains('translate-x-full');
        
        if (isOpen) {
            backdrop.classList.remove('hidden');
            void backdrop.offsetWidth;
            backdrop.classList.remove('opacity-0');
            sidebar.classList.remove('translate-x-full');
            const searchEl = document.getElementById('sidebar-search');
            if(searchEl) searchEl.value = ''; 
            this.renderSidebarArtists();
        } else {
            backdrop.classList.add('opacity-0');
            sidebar.classList.add('translate-x-full');
            setTimeout(() => backdrop.classList.add('hidden'), 300);
        }
    },

    showView(viewName) {
        this.closeModal();
        this.closeDropdown();
        if (typeof this.closeGenreModal === 'function') this.closeGenreModal();
        this.closeNotePanel();
        if (typeof this.closeAllNotesModal === 'function') this.closeAllNotesModal();
        
        const exportModal = document.getElementById('export-playlist-modal');
        if(exportModal) exportModal.classList.add('hidden');
        
        ['home', 'library', 'community', 'search', 'stats', 'cinema', 'cinema-search', 'literature', 'literature-search'].forEach(v => {
            const btn = document.getElementById(`nav-${v}`);
            const icon = document.getElementById(`nav-icon-${v}`);
            if (v === viewName) {
                btn?.classList.add('text-primary', 'bg-primary/10'); 
                btn?.classList.remove('text-gray-400', 'dark:text-gray-500', 'hover:bg-lightHighlight', 'dark:hover:bg-gray-800');
                icon?.classList.add('ph-fill'); 
                icon?.classList.remove('ph');
            } else {
                btn?.classList.remove('text-primary', 'bg-primary/10'); 
                btn?.classList.add('text-gray-400', 'dark:text-gray-500', 'hover:bg-lightHighlight', 'dark:hover:bg-gray-800');
                icon?.classList.remove('ph-fill'); 
                icon?.classList.add('ph');
            }
        });

        document.querySelectorAll('.view-section').forEach(el => el.classList.add('hidden'));
        
        const currentViewEl = document.getElementById(`view-${viewName}`);
        if(currentViewEl) currentViewEl.classList.remove('hidden');
        
        AppState.currentView = viewName;

        if (viewName === 'home') {
            if (typeof this.renderHomeGrid === 'function') this.renderHomeGrid();
        }
        else if (viewName === 'library') { 
            this.renderLibrary(); 
        } 
        else if (viewName === 'cinema') {
            if (typeof this.renderCinemaGrid === 'function') this.renderCinemaGrid();
        }
        else if (viewName === 'literature') {
            if (typeof this.renderLiteratureGrid === 'function') this.renderLiteratureGrid();
        }
        else if (viewName === 'community') {
            this.loadCommunityData();
        }
        else if (viewName === 'stats') { this.renderStats(); }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    switchCommunityTab(tab) {
        AppState.communityTab = tab;
        const btnAgg = document.getElementById('tab-btn-aggregated');
        const btnFeed = document.getElementById('tab-btn-feed');
        const viewAgg = document.getElementById('community-tab-aggregated');
        const viewFeed = document.getElementById('community-tab-feed');

        if (tab === 'aggregated') {
            btnAgg.className = "px-4 py-2 rounded-lg text-xs font-bold bg-primary text-white transition-colors";
            btnFeed.className = "px-4 py-2 rounded-lg text-xs font-bold text-gray-500 dark:text-gray-400 transition-colors";
            viewAgg.classList.remove('hidden');
            viewFeed.classList.add('hidden');
        } else {
            btnFeed.className = "px-4 py-2 rounded-lg text-xs font-bold bg-primary text-white transition-colors";
            btnAgg.className = "px-4 py-2 rounded-lg text-xs font-bold text-gray-500 dark:text-gray-400 transition-colors";
            viewFeed.classList.remove('hidden');
            viewAgg.classList.add('hidden');
        }
    },

    async loadCommunityData() {
        const aggregatedGrid = document.getElementById('aggregated-albums-grid');
        const publicGrid = document.getElementById('public-ratings-grid');

        if(aggregatedGrid) aggregatedGrid.innerHTML = `<div class="col-span-full flex justify-center p-8"><i class="ph-bold ph-spinner-gap animate-spin text-3xl text-primary"></i></div>`;
        if(publicGrid) publicGrid.innerHTML = `<div class="col-span-full flex justify-center p-8"><i class="ph-bold ph-spinner-gap animate-spin text-3xl text-primary"></i></div>`;

        try {
            // Fetch all public ratings
            const q = query(collection(db, 'bir_yonuyle_data'), where('isPrivate', '==', false));
            const querySnapshot = await getDocs(q);

            const allPublicEntries = [];
            const albumAggregates = {}; // mbid -> { title, artist, coverUrl, scores: [], tracks: { title: scores[] } }

            querySnapshot.forEach(docSnap => {
                const data = docSnap.data();
                if (data && data.album_data) {
                    const album = data.album_data;
                    allPublicEntries.push({ ...album, user_id: data.user_id, userName: data.userName || 'Kullanıcı' });

                    // Aggregate album & track scores
                    if (!albumAggregates[album.id]) {
                        albumAggregates[album.id] = {
                            id: album.id,
                            title: album.title,
                            artist: album.artist,
                            coverUrl: album.customCoverUrl || album.coverUrl,
                            year: album.year,
                            scores: [],
                            tracks: {}
                        };
                    }

                    if (album.averageScore > 0) {
                        albumAggregates[album.id].scores.push(album.averageScore);
                    }

                    if (album.tracks) {
                        album.tracks.forEach(tr => {
                            if (tr.rating > 0) {
                                if (!albumAggregates[album.id].tracks[tr.title]) {
                                    albumAggregates[album.id].tracks[tr.title] = [];
                                }
                                albumAggregates[album.id].tracks[tr.title].push(tr.rating);
                            }
                        });
                    }
                }
            });

            // --- RENKLENDİRME YARDIMCI FONKSİYONLARI ---
            const getScoreTextColor = (val) => app.getTextColorByRating(val);
            const getScoreBadgeColor = (val) => app.getBadgeColorByRating(val);


            // 1. Render Aggregated Scores Grid
            if (aggregatedGrid) {
                aggregatedGrid.innerHTML = '';
                const albumKeys = Object.keys(albumAggregates);

                if (albumKeys.length === 0) {
                    aggregatedGrid.innerHTML = `<div class="col-span-full text-center py-10 text-gray-500">Henüz açık topluluk verisi yok.</div>`;
                } else {
                    albumKeys.forEach(id => {
                        const agg = albumAggregates[id];
                        const avgAlbumScore = agg.scores.length > 0 
                            ? (agg.scores.reduce((a, b) => a + b, 0) / agg.scores.length).toFixed(1) 
                            : '-';
                        
                        const albumTextColor = avgAlbumScore !== '-' ? getScoreTextColor(avgAlbumScore) : 'text-white';
                        const albumBadgeColor = avgAlbumScore !== '-' ? getScoreBadgeColor(avgAlbumScore) : 'bg-gray-100 text-gray-500';

                        // YENİ: Puan veren kullanıcıların isimlerini listeleme
                        // Aggregation mantığınızda isimleri 'usernames' veya 'nicknames' dizisinde tuttuğunuz varsayılmıştır.
                        const ratersList = agg.usernames || agg.nicknames; 
                        const ratersText = ratersList && ratersList.length > 0 
                            ? ratersList.join(', ') 
                            : `${agg.scores.length} oy`; // Veri yoksa yedek olarak oy sayısını gösterir

                        let tracksHtml = '';
                        Object.keys(agg.tracks).forEach(trackTitle => {
                            const trScores = agg.tracks[trackTitle];
                            const trAvg = (trScores.reduce((a, b) => a + b, 0) / trScores.length).toFixed(1);
                            const trackColor = getScoreTextColor(trAvg);
                            
                            tracksHtml += `<div class="flex justify-between items-center text-xs py-1.5 border-b border-lightBorder/30 dark:border-gray-800/40 last:border-0">
                                <span class="truncate pr-2 font-medium italic text-gray-700 dark:text-gray-300">${Utils.escapeHTML(trackTitle)}</span>
                                <span class="font-bold flex-shrink-0 ${trackColor}">${trAvg} ★</span>
                            </div>`;
                        });

                        const card = document.createElement('div');
                        card.className = "bg-white dark:bg-surface rounded-2xl border border-lightBorder dark:border-gray-800 shadow-sm flex flex-col relative overflow-hidden group min-h-[320px]";
                        
                        card.innerHTML = `
                            <!-- Kapak Görseli ve Puan Katmanı -->
                            <div class="absolute inset-0 z-20 transition-opacity duration-500 ease-in-out group-hover:opacity-0 pointer-events-none bg-lightHighlight dark:bg-surface">
                                <img src="${Utils.escapeHTML(agg.coverUrl)}" onerror="this.src='https://placehold.co/400x400/ebe4dc/594636?text=${t('no_cover').replace(/ /g, '+')}'; this.onerror=null;" class="w-full h-full object-cover" alt="Cover">
                                
                                <!-- Sağ Alt Köşe Puan Rozeti (Renkli) -->
                                <div class="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md ${albumTextColor} px-3 py-1.5 rounded-xl text-sm font-black shadow-2xl border border-white/10 flex items-center gap-1.5">
                                    ${avgAlbumScore} <i class="ph-fill ph-star"></i>
                                </div>
                            </div>

                            <!-- Mevcut Detaylar Katmanı -->
                            <div class="relative z-10 flex flex-col gap-3 p-4 h-full pointer-events-auto">
                                <div class="flex gap-3 items-center">
                                    <img src="${Utils.escapeHTML(agg.coverUrl)}" class="w-16 h-16 rounded-xl object-cover border border-lightBorder dark:border-gray-800 shadow-sm flex-shrink-0" onerror="this.src='https://placehold.co/100x100/ebe4dc/594636?text=${t('no_cover').replace(/ /g, '+')}'; this.onerror=null;">
                                    <div class="min-w-0 flex-1">
                                        <h3 class="font-bold text-gray-900 dark:text-white truncate text-base italic">${Utils.escapeHTML(agg.title)}</h3>
                                        <p class="text-xs text-gray-500 truncate">${Utils.escapeHTML(agg.artist)}</p>
                                        <p class="text-[10px] text-gray-400 font-semibold mb-1">${Utils.escapeHTML(agg.year)}</p>
                                        
                                        <!-- YENİ: Ortalamanın Yanında Kullanıcı İsimleri -->
                                        <div class="flex items-center gap-1.5 mt-1 overflow-hidden">
                                            <span class="text-xs font-black ${albumBadgeColor} px-2 py-0.5 rounded-full flex-shrink-0">${avgAlbumScore} Ort.</span>
                                            <span class="text-[10px] text-gray-400 font-semibold truncate cursor-help" title="${Utils.escapeHTML(ratersText)}">(${Utils.escapeHTML(ratersText)})</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Liste Taşıyıcısı ve Dinamik Fade Efekti -->
                                <div class="relative mt-2 flex-grow">
                                    <div class="track-scroll-container bg-lightBg/50 dark:bg-darker/50 rounded-xl px-3 py-2 border border-lightBorder/50 dark:border-gray-800/50 max-h-48 overflow-y-auto hide-scrollbar h-full">
                                        ${tracksHtml || '<p class="text-xs text-gray-500 text-center py-2">Henüz oylanan şarkı yok.</p>'}
                                    </div>
                                    <!-- Dinamik olarak gizlenip açılacak fade katmanı -->
                                    <div class="track-fade-overlay absolute bottom-[1px] left-[1px] right-[1px] h-16 bg-gradient-to-t from-lightBg dark:from-darker to-transparent pointer-events-none rounded-b-xl transition-opacity duration-300"></div>
                                </div>
                            </div>
                        `;
                        
                        aggregatedGrid.appendChild(card);

                        // --- Scroll Durumunu Kontrol Eden Dinamik Yapı ---
                        const scrollContainer = card.querySelector('.track-scroll-container');
                        const fadeOverlay = card.querySelector('.track-fade-overlay');

                        if (scrollContainer && fadeOverlay) {
                            const updateFade = () => {
                                const isAtBottom = Math.abs(scrollContainer.scrollHeight - scrollContainer.clientHeight - scrollContainer.scrollTop) <= 2;
                                if (scrollContainer.scrollHeight <= scrollContainer.clientHeight || isAtBottom) {
                                    fadeOverlay.style.opacity = '0';
                                } else {
                                    fadeOverlay.style.opacity = '1';
                                }
                            };
                            scrollContainer.addEventListener('scroll', updateFade);
                            setTimeout(updateFade, 10);
                        }
                    });
                }
            }

            // 2. Render Public Feed Grid
            if (publicGrid) {
                publicGrid.innerHTML = '';
                if (allPublicEntries.length === 0) {
                    publicGrid.innerHTML = `<div class="col-span-full text-center py-10 text-gray-500">Henüz açık kullanıcı puanı yok.</div>`;
                } else {
                    allPublicEntries.forEach(album => {
                        const albumBadgeColor = album.averageScore > 0 ? getScoreBadgeColor(album.averageScore) : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400';
                        
                        const card = document.createElement('div');
                        card.className = "bg-white dark:bg-surface rounded-2xl p-3 border border-lightBorder dark:border-gray-800 shadow-sm flex gap-3 items-center cursor-pointer hover:bg-lightHighlight dark:hover:bg-surfaceHover active:scale-95 transition-transform";
                        card.onclick = () => this.openAlbumModal(album.id, album.title, album.artist, album.year);
                        card.innerHTML = `
                            <img src="${Utils.escapeHTML(album.customCoverUrl || album.coverUrl)}" class="w-16 h-16 rounded-xl object-cover border border-lightBorder dark:border-gray-800 shadow-sm flex-shrink-0">
                            <div class="min-w-0 flex-1">
                                <h4 class="font-bold text-gray-900 dark:text-white truncate text-sm italic">${Utils.escapeHTML(album.title)}</h4>
                                <p class="text-xs text-gray-500 truncate">${Utils.escapeHTML(album.artist)}</p>
                                <div class="flex justify-between items-center mt-1.5">
                                    <span class="text-[10px] ${albumBadgeColor} px-2 py-0.5 rounded-md font-bold">${album.averageScore || '-'} ★</span>
                                    <span class="text-[10px] text-gray-400 font-semibold truncate">${Utils.escapeHTML(album.userName)}</span>
                                </div>
                            </div>
                        `;
                        publicGrid.appendChild(card);
                    });
                }
            }

        } catch (e) {
            console.error("Topluluk verisi çekilirken hata:", e);
            if(aggregatedGrid) aggregatedGrid.innerHTML = `<div class="col-span-full text-center p-4 text-red-500">Yüklenemedi.</div>`;
        }
    },

    toggleLanguage() {
        AppState.language = AppState.language === 'en' ? 'tr' : 'en';
        localStorage.setItem('birYonuyleLang', AppState.language);
        this.updateLanguageUI();
        this.updateSearchPlaceholder();
        this.updatePrivacyUI();
        
        if (AppState.currentModalAlbum && !document.getElementById('album-modal').classList.contains('hidden')) {
            this.updateModalUI();
        }
        
        if (AppState.currentView === 'library') this.renderLibrary();
        else if (AppState.currentView === 'community') this.loadCommunityData();
        else if (AppState.currentView === 'stats') this.renderStats();
    },

    toggleLanguage() {
        AppState.language = AppState.language === 'en' ? 'tr' : 'en';
        localStorage.setItem('birYonuyleLang', AppState.language);
        this.updateLanguageUI();
        this.updateSearchPlaceholder();
        this.updatePrivacyUI();
        
        if (AppState.currentModalAlbum && !document.getElementById('album-modal').classList.contains('hidden')) {
            this.updateModalUI();
        }
        
        if (AppState.currentView === 'library') this.renderLibrary();
        else if (AppState.currentView === 'community') this.loadCommunityData();
        else if (AppState.currentView === 'stats') this.renderStats();
    },

    updateLanguageUI() {
        const langIcon = document.getElementById('lang-icon');
        if (langIcon) langIcon.textContent = AppState.language === 'en' ? 'TR' : 'EN';
        document.querySelectorAll('[data-i18n]').forEach(el => el.innerHTML = Translations[AppState.language][el.getAttribute('data-i18n')] || el.innerHTML);
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => el.placeholder = Translations[AppState.language][el.getAttribute('data-i18n-placeholder')] || el.placeholder);
        document.querySelectorAll('[data-i18n-title]').forEach(el => el.title = Translations[AppState.language][el.getAttribute('data-i18n-title')] || el.title);
    },

    toggleTheme() {
        const html = document.documentElement;
        const meta = document.getElementById('meta-theme-color');
        if (html.classList.contains('dark')) {
            html.classList.remove('dark'); localStorage.setItem('theme', 'light');
            if(meta) meta.setAttribute('content', '#f7f4f0');
        } else {
            html.classList.add('dark'); localStorage.setItem('theme', 'dark');
            if(meta) meta.setAttribute('content', '#1c140f');
        }
        this.updateThemeIcon();
        if (AppState.currentView === 'stats') this.renderStats();
    },

    updateThemeIcon() {
        const icon = document.getElementById('theme-icon');
        if(!icon) return;
        if (document.documentElement.classList.contains('dark')) {
            icon.className = 'ph-fill ph-moon text-lg px-1 text-yellow-400';
        } else {
            icon.className = 'ph-fill ph-sun text-lg px-1 text-amber-500';
        }
    },

    async signIn() {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error("Giriş hatası:", error.message);
            showToast("Giriş yapılamadı.", "error");
        }
    },

    async signOut() {
        await signOut(auth);
        this.toggleSidebar(false);
        showToast(t("sign_out"), "info");
    },

    // Yeni Nickname Güncelleme Fonksiyonu
    async updateNickname() {
        const user = auth.currentUser;
        if (!user) return;
        
        const nickInput = document.getElementById('profile-nickname-input');
        const newName = nickInput ? nickInput.value.trim() : '';
        
        if (!newName) {
            showToast("Kullanıcı adı boş olamaz.", "error");
            return;
        }
        
        try {
            // 1. Kullanıcı profilini güncelle
            await setDoc(doc(db, 'users', user.uid), { displayName: newName }, { merge: true });
            
            // 2. Arayüzdeki ismi güncelle
            const nameEl = document.getElementById('user-name');
            if(nameEl) nameEl.textContent = newName;
            showToast("Kullanıcı adı güncellendi!", "success");

            // 3. Geçmiş oylamalardaki (Kitaplık) ismi güncelle ki toplulukta da görünsün
            const q = query(collection(db, 'bir_yonuyle_data'), where('user_id', '==', user.uid));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(async (docSnap) => {
                await setDoc(doc(db, 'bir_yonuyle_data', docSnap.id), { userName: newName }, { merge: true });
            });
            
            // Topluluk sekmesi açıksa yeniden yükle
            if (AppState.currentView === 'community') this.loadCommunityData();

        } catch (e) {
            console.error("Kullanıcı adı güncellenirken hata:", e);
            showToast("Bir hata oluştu.", "error");
        }
    },

    // Formu yönetecek fonksiyon
    initEmailAuth() {
        const authForm = document.getElementById('auth-form');
        const emailInput = document.getElementById('auth-email');
        const passwordInput = document.getElementById('auth-password');
        const nicknameGroup = document.getElementById('nickname-group');
        const nicknameInput = document.getElementById('auth-nickname');
        const authTitle = document.getElementById('auth-title');
        const submitBtn = document.getElementById('auth-submit-btn');
        const toggleBtn = document.getElementById('auth-toggle-btn');
        const toggleText = document.getElementById('auth-toggle-text');

        let isLoginMode = true;

        if (toggleBtn) {
            toggleBtn.addEventListener('click', (e) => {
                e.preventDefault();
                isLoginMode = !isLoginMode;
                
                if (isLoginMode) {
                    authTitle.innerText = "Giriş Yap";
                    submitBtn.innerText = "Giriş Yap";
                    toggleText.innerText = "Hesabın yok mu?";
                    toggleBtn.innerText = "Kayıt Ol";
                    nicknameGroup.classList.add('hidden');
                    nicknameInput.removeAttribute('required');
                } else {
                    authTitle.innerText = "Kayıt Ol";
                    submitBtn.innerText = "Hesap Oluştur";
                    toggleText.innerText = "Zaten bir hesabın var mı?";
                    toggleBtn.innerText = "Giriş Yap";
                    nicknameGroup.classList.remove('hidden');
                    nicknameGroup.classList.add('flex');
                    nicknameInput.setAttribute('required', 'true');
                }
            });
        }

        if (authForm) {
            authForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const email = emailInput.value.trim();
                const password = passwordInput.value;
                const nickname = nicknameInput.value.trim();
                
                const originalBtnText = submitBtn.innerText;
                submitBtn.innerHTML = `<i class="ph-bold ph-spinner animate-spin"></i>`;
                submitBtn.disabled = true;

                try {
                    if (isLoginMode) {
                        await signInWithEmailAndPassword(auth, email, password);
                        showToast("Giriş başarılı!", "success");
                    } else {
                        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                        const user = userCredential.user;

                        await setDoc(doc(db, "users", user.uid), {
                            displayName: nickname, 
                            email: email,
                            isPrivate: false,
                            createdAt: new Date().toISOString()
                        });
                        showToast("Kayıt başarılı!", "success");
                    }
                    authForm.reset();
                    app.toggleSidebar(false); 
                } catch (error) {
                    showToast("Hata: " + error.message, "error");
                } finally {
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled = false;
                }
            });
        }
    },

    initEmailAuth() {
        const authForm = document.getElementById('auth-form');
        const emailInput = document.getElementById('auth-email');
        const passwordInput = document.getElementById('auth-password');
        const nicknameInput = document.getElementById('auth-nickname');
        const authTitle = document.getElementById('auth-title');
        const submitBtn = document.getElementById('auth-submit-btn');
        const toggleBtn = document.getElementById('auth-toggle-btn');
        const toggleText = document.getElementById('auth-toggle-text');

        let isLoginMode = true;

        if (toggleBtn) {
            toggleBtn.addEventListener('click', (e) => {
                e.preventDefault();
                isLoginMode = !isLoginMode;
                
                if (isLoginMode) {
                    authTitle.innerText = "Giriş Yap";
                    submitBtn.innerText = "Giriş Yap";
                    toggleText.innerText = "Hesabın yok mu?";
                    toggleBtn.innerText = "Kayıt Ol";
                    nicknameInput.classList.add('hidden');
                    nicknameInput.removeAttribute('required');
                } else {
                    authTitle.innerText = "Kayıt Ol";
                    submitBtn.innerText = "Hesap Oluştur";
                    toggleText.innerText = "Zaten bir hesabın var mı?";
                    toggleBtn.innerText = "Giriş Yap";
                    nicknameInput.classList.remove('hidden');
                    nicknameInput.setAttribute('required', 'true');
                }
            });
        }

        if (authForm) {
            authForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const email = emailInput.value.trim();
                const password = passwordInput.value;
                const nickname = nicknameInput.value.trim();
                
                const originalBtnText = submitBtn.innerText;
                submitBtn.innerHTML = `<i class="ph-bold ph-spinner animate-spin"></i>`;
                submitBtn.disabled = true;

                try {
                    if (isLoginMode) {
                        await signInWithEmailAndPassword(auth, email, password);
                        showToast("Giriş başarılı!", "success");
                    } else {
                        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                        const user = userCredential.user;

                        // Yeni kullanıcının bilgilerini Firestore'a kaydet (Topluluk akışı için nickname kullanılır)
                        await setDoc(doc(db, "users", user.uid), {
                            displayName: nickname, 
                            email: email,
                            isPrivate: false,
                            createdAt: new Date().toISOString()
                        });
                        
                        showToast("Kayıt başarılı!", "success");
                    }
                    
                    authForm.reset();
                    app.toggleSidebar(false); 
                    
                } catch (error) {
                    console.error("Auth hatası:", error);
                    showToast("Bir hata oluştu: " + error.message, "error");
                } finally {
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled = false;
                }
            });
        }
    },

    async loadData() {
        try {
            // Ziyaretçiler dahil HERKES verileri ADMIN'in veritabanından çeker
            const q = query(collection(db, 'bir_yonuyle_data'), where('user_id', '==', ADMIN_UID));
            const querySnapshot = await getDocs(q);
            
            AppState.library = []; 
            AppState.cinemaLibrary = []; 
            AppState.literatureLibrary = [];
            
            querySnapshot.forEach((docSnap) => {
                const data = docSnap.data();
                if (data && data.album_data) AppState.library.push(data.album_data);
                if (data && data.film_data) AppState.cinemaLibrary.push(data.film_data);
                if (data && data.literature_data) AppState.literatureLibrary.push(data.literature_data);
            });

            this.saveToLocal(); 

            if (AppState.currentView === 'home' && typeof this.renderHomeGrid === 'function') this.renderHomeGrid();
            if (AppState.currentView === 'library') this.renderLibrary();
            if (AppState.currentView === 'stats') this.renderStats();
            if (AppState.currentView === 'cinema' && typeof this.renderCinemaGrid === 'function') this.renderCinemaGrid();
            if (AppState.currentView === 'literature' && typeof this.renderLiteratureGrid === 'function') this.renderLiteratureGrid();
            
            console.log(`Veriler çekildi: ${AppState.library.length} Albüm, ${AppState.cinemaLibrary.length} Film, ${AppState.literatureLibrary.length} Kitap`);
        } catch (e) {
            console.error("Buluttan veri çekilirken hata: ", e.message);
            // Bağlantı kopması veya Firebase kuralı hatalarında yerel (Local Storage) verilerin kaybolmaması için diziler korunur.
            if (AppState.currentView === 'home' && typeof this.renderHomeGrid === 'function') this.renderHomeGrid();
        }
    },
    
    async saveAlbumData(album) { 
        this.saveToLocal();
        try {
            const user = auth.currentUser;
            if (!user) return;

            const docId = `${user.uid}_${album.id}`;
            await setDoc(doc(db, 'bir_yonuyle_data', docId), {
                id: album.id.toString(),
                album_data: album,
                user_id: user.uid,
                userName: user.displayName || 'Kullanıcı',
                isPrivate: AppState.isPrivate
            });
        } catch (e) {
            console.error("Buluta kaydederken hata: ", e.message);
        }
    },

    async saveCinemaData(film) { 
        this.saveToLocal();
        try {
            const user = auth.currentUser;
            if (!user) return;

            const docId = `${user.uid}_${film.id}`;
            await setDoc(doc(db, 'bir_yonuyle_data', docId), {
                id: film.id.toString(),
                film_data: film,
                user_id: user.uid,
                userName: user.displayName || 'Kullanıcı',
                isPrivate: AppState.isPrivate
            });
        } catch (e) {
            console.error("Film buluta kaydedilirken hata: ", e.message);
        }
    },

    async saveLiteratureData(book) { 
        this.saveToLocal();
        try {
            const user = auth.currentUser;
            if (!user) return;

            const docId = `${user.uid}_${book.id}`;
            await setDoc(doc(db, 'bir_yonuyle_data', docId), {
                id: book.id.toString(),
                literature_data: book,
                user_id: user.uid,
                userName: user.displayName || 'Kullanıcı',
                isPrivate: AppState.isPrivate
            });
        } catch (e) {
            console.error("Kitap buluta kaydedilirken hata: ", e.message);
        }
    },

     
    async deleteAlbumData(id) {
        this.saveToLocal();
        try {
            const user = auth.currentUser;
            if (!user) return;

            const docId = `${user.uid}_${id}`;
            await deleteDoc(doc(db, 'bir_yonuyle_data', docId));
        } catch (e) {
            console.error("Buluttan silerken hata: ", e.message);
        }
    },
    
    exportData() {
        if (AppState.library.length === 0) { showToast(t("toast_no_export"), "error"); return; }
        const data = JSON.stringify(AppState.library, null, 2);
        const blob = new Blob([data], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = `bir_yonuyle_${Date.now()}.json`;
        document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
        showToast(t("toast_export_success"), "success");
    },

    exportData() {
        if (AppState.library.length === 0) { showToast(t("toast_no_export"), "error"); return; }
        const data = JSON.stringify(AppState.library, null, 2);
        const blob = new Blob([data], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = `bir_yonuyle_${Date.now()}.json`;
        document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
        showToast(t("toast_export_success"), "success");
    },

    importData(event) {
        const file = event.target.files[0]; if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedData = JSON.parse(e.target.result);
                if (Array.isArray(importedData)) {
                    const currentIds = new Set(AppState.library.map(a => a.id)); let added = 0;
                    importedData.forEach(album => { 
                        if(album.id && !currentIds.has(album.id)) { 
                            AppState.library.push(album); 
                            this.saveAlbumData(album); 
                            added++; 
                        } 
                    });
                    this.renderLibrary(); this.renderStats();
                    showToast(`${added} ${t("toast_import_success")}`, "success");
                }
            } catch (err) { showToast(t("toast_import_error"), "error"); }
            event.target.value = ''; 
        };
        reader.readAsText(file);
    },

    exportHighRatedTracks() {
        let list = [];
        AppState.library.forEach(album => {
            if (album.tracks) album.tracks.forEach(track => { if (track.rating >= 4) list.push(`${album.artist} - ${track.title}`); });
        });
        if (list.length === 0) { showToast(t("toast_no_5star"), "error"); return; }
        const plArea = document.getElementById('playlist-textarea');
        const exModal = document.getElementById('export-playlist-modal');
        if(plArea && exModal) {
            plArea.value = list.join('\n');
            exModal.classList.remove('hidden');
            exModal.classList.add('flex');
        }
    },

    copyPlaylistToClipboard() {
        const ta = document.getElementById('playlist-textarea'); 
        if(!ta) return;
        ta.select(); ta.setSelectionRange(0, 99999);
        try { document.execCommand('copy'); showToast(t("toast_copied"), "success"); } catch (err) { showToast(t("toast_copy_fail"), "error"); }
    },

    openDropdown(event, type) {
        event.stopPropagation();
        const dd = document.getElementById('custom-dropdown');
        if(!dd) return;
        
        if (!dd.classList.contains('hidden') && this.currentDropdownType === type) {
            this.closeDropdown(); return;
        }

        const btn = event.currentTarget;
        const rect = btn.getBoundingClientRect();
        
        let items = new Set();
        let defLabel = '';
        
        if (type === 'Group') {
            AppState.library.forEach(a => { if(a.artist) items.add(a.artist); });
            defLabel = t('all_artists');
        } else if (type === 'Genre') {
            AppState.library.forEach(a => { if(a.genres) a.genres.forEach(g => items.add(g.trim())); });
            defLabel = t('all_genres');
        } else if (type === 'Year') {
            AppState.library.forEach(a => { 
                if(a.year) {
                    items.add(a.year); 
                    const decade = Math.floor(parseInt(a.year) / 10) * 10;
                    if (!isNaN(decade)) items.add(`${decade}s`);
                }
            });
            defLabel = t('all_years');
        } else if (type === 'Label') {
            AppState.library.forEach(a => { if(a.label && a.label !== t('unknown')) items.add(a.label); });
            defLabel = t('all_labels');
        }

        const currentVal = AppState[`filter${type}`];
        
        let html = `
            <div onclick="app.setFilter('${type}', '')" class="px-5 py-3 hover:bg-lightHighlight dark:hover:bg-surfaceHover cursor-pointer text-sm font-semibold flex justify-between items-center transition-colors border-b border-lightBorder/30 dark:border-gray-800/50 ${currentVal === '' ? 'text-primary' : 'text-gray-700 dark:text-gray-300'}">
                <span>${defLabel}</span>
                ${currentVal === '' ? '<i class="ph-bold ph-check text-lg"></i>' : ''}
            </div>
        `;
        
        let sortedItems = Array.from(items);
        if (type === 'Year') {
            sortedItems.sort((a, b) => {
                const aVal = a.toString().endsWith('s') ? parseInt(a) + 0.5 : parseInt(a);
                const bVal = b.toString().endsWith('s') ? parseInt(b) + 0.5 : parseInt(b);
                return bVal - aVal;
            });
        } else if (type === 'Genre') {
            sortedItems.sort((a, b) => tGenre(a).localeCompare(tGenre(b)));
        } else {
            sortedItems.sort();
        }

        sortedItems.forEach(item => {
            const isSelected = currentVal === item;
            const isDecade = type === 'Year' && item.toString().endsWith('s');
            const displayLabel = type === 'Genre' ? tGenre(item) : item;
            
            html += `
                <div onclick="app.setFilter('${type}', '${Utils.escapeHTML(item)}')" class="px-5 py-3 hover:bg-lightHighlight dark:hover:bg-surfaceHover cursor-pointer text-sm ${isDecade ? 'font-bold bg-lightBg/50 dark:bg-surface/50 border-y border-lightBorder/30 dark:border-gray-800/50' : 'font-medium'} flex justify-between items-center transition-colors ${isSelected ? 'text-primary' : 'text-gray-600 dark:text-gray-400'}">
                    <span class="truncate pr-4 ${isDecade ? 'text-gray-800 dark:text-gray-200' : ''}">${Utils.escapeHTML(displayLabel)}</span>
                    ${isSelected ? '<i class="ph-bold ph-check text-lg"></i>' : ''}
                </div>
            `;
        });

        dd.innerHTML = html;
        this.currentDropdownType = type;
        
        dd.classList.remove('hidden');
        
        let top = rect.bottom + 10;
        let left = rect.left;
        
        const ddWidth = Math.max(200, btn.offsetWidth * 1.5);
        dd.style.minWidth = `${ddWidth}px`;
        
        if (left + ddWidth > window.innerWidth) {
            left = window.innerWidth - ddWidth - 16;
        }
        
        if (top + 250 > window.innerHeight) {
            top = rect.top - dd.offsetHeight - 10; 
        }
        
        dd.style.top = `${top}px`;
        dd.style.left = `${Math.max(16, left)}px`;
        
        requestAnimationFrame(() => dd.classList.remove('opacity-0'));
    },
    
    closeDropdown() {
        const dd = document.getElementById('custom-dropdown');
        if(dd && !dd.classList.contains('hidden')) {
            dd.classList.add('opacity-0');
            setTimeout(() => dd.classList.add('hidden'), 200);
            this.currentDropdownType = null;
        }
    },
    
    setFilter(type, value) {
        AppState[`filter${type}`] = value;
        this.closeDropdown();
        this.renderLibrary();
    },

    filterSidebarArtists(text) {
        const list = document.getElementById('sidebar-artist-list');
        if(!list) return;
        list.innerHTML = '';
        const artists = [...new Set(AppState.library.map(a => a.artist))].sort();
        const filtered = artists.filter(a => a.toLowerCase().includes(text.toLowerCase()));
        if(filtered.length === 0) {
            list.innerHTML = `<li class="p-3 text-center text-sm text-gray-500">${t('no_saved_artists')}</li>`;
            return;
        }
        const frag = document.createDocumentFragment();
        filtered.forEach(art => {
            const count = AppState.library.filter(a => a.artist === art).length;
            const li = document.createElement('li');
            li.className = 'px-3 py-2 hover:bg-lightHighlight dark:bg-surfaceHover cursor-pointer flex justify-between items-center rounded-lg';
            li.onclick = () => {
                this.setFilter('Group', art);
                this.toggleSidebar(false);
                this.showView('library');
                window.scrollTo(0,0);
            };
            li.innerHTML = `<span class="text-sm font-medium text-gray-800 dark:text-gray-200 truncate pr-2">${Utils.escapeHTML(art)}</span><span class="text-xs bg-lightBorder dark:bg-gray-800 px-2 py-0.5 rounded-full font-bold">${count}</span>`;
            frag.appendChild(li);
        });
        list.appendChild(frag);
    },
    
    renderSidebarArtists(text = '') { this.filterSidebarArtists(text); },

    searchFromLink(query) {
        this.closeModal();
        this.showView('search');
        
        const searchTypes = document.getElementsByName('searchType');
        for(let st of searchTypes) { 
            if(st.value === 'artist') st.checked = true; 
        }
        this.updateSearchPlaceholder();
        
        const searchInput = document.getElementById('search-input');
        if(searchInput) {
            searchInput.value = query;
            this.search();
        }
    },

    setGlobalGridSize(size) {
        AppState.globalGridSize = size;
        AppState.gridSize = size;
        AppState.cinemaGridSize = size;
        AppState.literatureGridSize = size;
        
        localStorage.setItem('birYonuyleGlobalGridSize', size);
        
        ['normal', 'small', 'xsmall'].forEach(s => {
            const btn = document.getElementById(`btn-global-grid-${s}`);
            if(btn) {
                if (s === size) {
                    btn.classList.add('text-primary', 'bg-primary/10', 'dark:bg-primary/20');
                    btn.classList.remove('text-gray-500', 'dark:text-gray-400');
                } else {
                    btn.classList.remove('text-primary', 'bg-primary/10', 'dark:bg-primary/20');
                    btn.classList.add('text-gray-500', 'dark:text-gray-400');
                }
            }
        });

        this.updateGridClasses();
        if (this.updateCinemaGridClasses) this.updateCinemaGridClasses();
        if (this.updateLiteratureGridClasses) this.updateLiteratureGridClasses();
        
        if (AppState.currentView === 'home' && typeof this.renderHomeGrid === 'function') this.renderHomeGrid();
        else if (AppState.currentView === 'library') this.renderLibrary();
        else if (AppState.currentView === 'cinema' && typeof this.renderCinemaGrid === 'function') this.renderCinemaGrid();
        else if (AppState.currentView === 'literature' && typeof this.renderLiteratureGrid === 'function') this.renderLiteratureGrid();
    },

    updateGridClasses() {
        const grid = document.getElementById('library-grid'); 
        const homeGrid = document.getElementById('home-grid');
        let newClass = '';
        
        if(AppState.gridSize === 'normal') newClass = 'grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3';
        else if(AppState.gridSize === 'small') newClass = 'grid grid-cols-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-1.5 sm:gap-2';
        else newClass = 'grid grid-cols-5 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 xl:grid-cols-10 gap-1 sm:gap-1.5';
        
        if(grid) grid.className = newClass;
        if(homeGrid) homeGrid.className = newClass;
    },

    setCinemaGridSize(size) {
        AppState.cinemaGridSize = size; 
        localStorage.setItem('cinemaGridSize', size);
        ['normal', 'small', 'xsmall'].forEach(s => {
            const btn = document.getElementById(`btn-cinema-grid-${s}`);
            if(btn) {
                if (s === size) {
                    btn.classList.add('text-purple-600', 'bg-purple-500/10', 'dark:text-purple-400');
                    btn.classList.remove('text-gray-500');
                } else {
                    btn.classList.remove('text-purple-600', 'bg-purple-500/10', 'dark:text-purple-400');
                    btn.classList.add('text-gray-500');
                }
            }
        });
        this.updateCinemaGridClasses(); 
        if(AppState.currentView === 'cinema') this.renderCinemaGrid();
    },

    updateCinemaGridClasses() {
        const grid = document.getElementById('cinema-grid'); if(!grid) return;
        if(AppState.cinemaGridSize === 'normal') grid.className = 'grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3';
        else if(AppState.cinemaGridSize === 'small') grid.className = 'grid grid-cols-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-1.5 sm:gap-2';
        else grid.className = 'grid grid-cols-5 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 xl:grid-cols-10 gap-1 sm:gap-1.5';
    },

    setLiteratureGridSize(size) {
        AppState.literatureGridSize = size; 
        localStorage.setItem('literatureGridSize', size);
        ['normal', 'small', 'xsmall'].forEach(s => {
            const btn = document.getElementById(`btn-literature-grid-${s}`);
            if(btn) {
                if (s === size) {
                    btn.classList.add('text-primary', 'bg-primary/10');
                    btn.classList.remove('text-gray-500');
                } else {
                    btn.classList.remove('text-primary', 'bg-primary/10');
                    btn.classList.add('text-gray-500');
                }
            }
        });
        this.updateLiteratureGridClasses(); 
        if(AppState.currentView === 'literature') this.renderLiteratureGrid();
    },

    updateLiteratureGridClasses() {
        const grid = document.getElementById('literature-grid'); if(!grid) return;
        if(AppState.literatureGridSize === 'normal') grid.className = 'grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3';
        else if(AppState.literatureGridSize === 'small') grid.className = 'grid grid-cols-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-1.5 sm:gap-2';
        else grid.className = 'grid grid-cols-5 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 xl:grid-cols-10 gap-1 sm:gap-1.5';
    },

    setPlacesGridSize(size) {
        AppState.placesGridSize = size; 
        localStorage.setItem('placesGridSize', size);
        ['normal', 'small', 'xsmall'].forEach(s => {
            const btn = document.getElementById(`btn-places-grid-${s}`);
            if(btn) {
                if (s === size) {
                    btn.classList.add('text-blue-600', 'bg-blue-500/10', 'dark:text-blue-400');
                    btn.classList.remove('text-gray-500');
                } else {
                    btn.classList.remove('text-blue-600', 'bg-blue-500/10', 'dark:text-blue-400');
                    btn.classList.add('text-gray-500');
                }
            }
        });
        this.updatePlacesGridClasses(); 
        if(AppState.currentView === 'places') this.renderPlacesGrid();
    },

    updatePlacesGridClasses() {
        const grid = document.getElementById('places-grid'); if(!grid) return;
        if(AppState.placesGridSize === 'normal') grid.className = 'grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3';
        else if(AppState.placesGridSize === 'small') grid.className = 'grid grid-cols-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-1.5 sm:gap-2';
        else grid.className = 'grid grid-cols-5 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 xl:grid-cols-10 gap-1 sm:gap-1.5';
    },
    
    toggleSort(type) {
        if (AppState.sortBy === type) AppState.sortDirection = AppState.sortDirection === 'desc' ? 'asc' : 'desc';
        else { AppState.sortBy = type; AppState.sortDirection = 'desc'; }
        localStorage.setItem('birYonuyleSortBy', AppState.sortBy);
        localStorage.setItem('birYonuyleSortDirection', AppState.sortDirection);
        this.updateSortClasses(); if (AppState.currentView === 'library') this.renderLibrary();
    },
    
    toggleSort(type) {
        if (AppState.sortBy === type) AppState.sortDirection = AppState.sortDirection === 'desc' ? 'asc' : 'desc';
        else { AppState.sortBy = type; AppState.sortDirection = 'desc'; }
        localStorage.setItem('birYonuyleSortBy', AppState.sortBy);
        localStorage.setItem('birYonuyleSortDirection', AppState.sortDirection);
        this.updateSortClasses(); 
        if (AppState.currentView === 'library') this.renderLibrary();
    },

    updateSortClasses() {
        ['dateAdded', 'year', 'rating'].forEach(type => {
            const btn = document.getElementById(`btn-sort-${type}`); const iconDir = document.getElementById(`icon-sort-${type}-dir`);
            if (!btn || !iconDir) return;
            if (AppState.sortBy === type) {
                btn.classList.add('text-primary', 'bg-primary/10'); btn.classList.remove('text-gray-500');
                iconDir.className = `ph-bold ph-arrow-${AppState.sortDirection === 'desc' ? 'down' : 'up'} text-[10px]`; iconDir.style.opacity = '1';
            } else {
                btn.classList.remove('text-primary', 'bg-primary/10'); btn.classList.add('text-gray-500');
                iconDir.className = 'ph-bold ph-arrow-down text-[10px]'; iconDir.style.opacity = '0.3';
            }
        });
    },

    toggleHomeSort(type) {
        if (AppState.homeSortBy === type) {
            AppState.homeSortDirection = AppState.homeSortDirection === 'desc' ? 'asc' : 'desc';
        } else { 
            AppState.homeSortBy = type; 
            AppState.homeSortDirection = 'desc'; 
        }
        localStorage.setItem('birYonuyleHomeSortBy', AppState.homeSortBy);
        localStorage.setItem('birYonuyleHomeSortDirection', AppState.homeSortDirection);
        this.updateHomeSortClasses(); 
        if (AppState.currentView === 'home') this.renderHomeGrid();
    },

    updateHomeSortClasses() {
        ['dateAdded', 'year', 'rating'].forEach(type => {
            const btn = document.getElementById(`btn-home-sort-${type}`); 
            const iconDir = document.getElementById(`icon-home-sort-${type}-dir`);
            if (!btn || !iconDir) return;
            if (AppState.homeSortBy === type) {
                btn.classList.add('text-indigo-600', 'bg-indigo-500/10', 'dark:text-primary'); btn.classList.remove('text-gray-500');
                iconDir.className = `ph-bold ph-arrow-${AppState.homeSortDirection === 'desc' ? 'down' : 'up'} text-[10px]`; iconDir.style.opacity = '1';
            } else {
                btn.classList.remove('text-indigo-600', 'bg-indigo-500/10', 'dark:text-primary'); btn.classList.add('text-gray-500');
                iconDir.className = 'ph-bold ph-arrow-down text-[10px]'; iconDir.style.opacity = '0.3';
            }
        });
    },

    openHomeItemModal(type, id) {
        if(type === 'cinema') {
            const film = (AppState.cinemaLibrary || []).find(f => f.id === id);
            if(film) {
                this.openCinemaModal();
                setTimeout(() => {
                    document.getElementById('cinema-title').value = film.title || '';
                    document.getElementById('cinema-director').value = film.director || '';
                    document.getElementById('cinema-year').value = film.year || '';
                    document.getElementById('cinema-genre').value = film.genre || '';
                    document.getElementById('cinema-country').value = film.country || ''; // YENİ EKLENDİ
                    document.getElementById('cinema-duration').value = film.duration || '';
                    document.getElementById('cinema-poster').value = film.poster || '';
                    document.getElementById('cinema-modal-cover').src = film.poster || 'https://placehold.co/400x600/ebe4dc/594636?text=Yok';
                    document.getElementById('cinema-review').innerHTML = film.review || '';
                    document.querySelectorAll('.cinema-delete-btn').forEach(b => b.classList.remove('hidden'));
                    document.getElementById('cinema-cast-list').innerHTML = '';
                    if (film.cast && film.cast.length > 0) film.cast.forEach(c => this.addCinemaCastRow(c));
                    else this.addCinemaCastRow();
                    this.currentCinemaRating = film.rating || 0;
                    this.renderCinemaRating();
                    AppState.currentCinemaId = film.id;
                }, 50);
            }
        } else if (type === 'literature') {
            const book = (AppState.literatureLibrary || []).find(f => f.id === id);
            if(book) {
                this.openLiteratureModal();
                setTimeout(() => {
                    document.getElementById('literature-title').value = book.title || '';
                    document.getElementById('literature-author').value = book.author || '';
                    document.getElementById('literature-year').value = book.year || '';
                    document.getElementById('literature-publisher').value = book.publisher || '';
                    document.getElementById('literature-pages').value = book.pages || '';
                    document.getElementById('literature-genre').value = book.genre || '';
                    document.getElementById('literature-translator').value = book.translator || '';
                    document.getElementById('literature-country').value = book.country || '';
                    
                    // Çevirmen verisi varsa kutuyu göster, yoksa gizle
                    if (book.translator) {
                        document.getElementById('literature-translator-container')?.classList.remove('hidden');
                    } else {
                        document.getElementById('literature-translator-container')?.classList.add('hidden');
                    }
                    
                    document.getElementById('literature-cover').value = book.cover || '';
                    document.getElementById('literature-modal-cover').src = book.cover || 'https://placehold.co/400x600/ebe4dc/594636?text=Yok';
                    document.getElementById('literature-review').innerHTML = book.review || '';
                    document.querySelectorAll('.literature-delete-btn').forEach(b => b.classList.remove('hidden'));
                    this.currentLiteratureRating = book.rating || 0;
                    this.renderLiteratureRating();
                    AppState.currentLiteratureId = book.id;
                }, 50);
            }
        } else if (type === 'places') {
            const place = (AppState.placesLibrary || []).find(f => f.id === id);
            if(place) {
                this.openPlacesModal();
                setTimeout(() => {
                    document.getElementById('places-title').value = place.title || '';
                    document.getElementById('places-city').value = place.city || '';
                    document.getElementById('places-type').value = place.type || '';
                    document.getElementById('places-year').value = place.year || '';
                    document.getElementById('places-cover').value = place.cover || '';
                    document.getElementById('places-modal-cover').src = place.cover || 'https://placehold.co/600x400/ebe4dc/594636?text=Yok';
                    document.getElementById('places-review').value = place.review || '';
                    document.getElementById('places-delete-btn')?.classList.remove('hidden');
                    this.currentPlacesRating = place.rating || 0;
                    this.renderPlacesRating();
                    AppState.currentPlacesId = place.id;
                }, 50);
            }
        } else if (type === 'things') {
            const item = (AppState.thingsLibrary || []).find(f => f.id === id);
            if(item) {
                this.openThingsModal();
                setTimeout(() => {
                    document.getElementById('things-title').value = item.title || '';
                    document.getElementById('things-brand').value = item.brand || '';
                    document.getElementById('things-type').value = item.type || '';
                    document.getElementById('things-year').value = item.year || '';
                    document.getElementById('things-cover').value = item.cover || '';
                    document.getElementById('things-modal-cover').src = item.cover || 'https://placehold.co/600x600/ebe4dc/594636?text=Yok';
                    document.getElementById('things-review').value = item.review || '';
                    document.getElementById('things-delete-btn')?.classList.remove('hidden');
                    this.currentThingsRating = item.rating || 0;
                    this.renderThingsRating();
                    AppState.currentThingsId = item.id;
                }, 50);
            }
                      
        }
    },

    renderHomeGrid() {
        const grid = document.getElementById('home-grid');
        const emptyState = document.getElementById('home-empty-state');
        if(!grid || !emptyState) return;

        let allPosts = [];

        // 1. MÜZİK
        (AppState.library || []).forEach(item => allPosts.push({
            type: 'library', 
            id: item.id, title: item.title, subtitle: item.artist,
            meta: (item.genres && item.genres.length > 0) ? tGenre(item.genres[0]) : t('unknown'),
            year: item.year, rating: item.averageScore || 0,
            cover: item.customCoverUrl || item.coverUrl, dateAdded: new Date(item.dateAdded || 0)
        }));

        // 2. SİNEMA
        (AppState.cinemaLibrary || []).forEach(item => allPosts.push({
            type: 'cinema', 
            id: item.id, title: item.title, subtitle: item.director,
            meta: item.genre, year: item.year, rating: item.rating || 0,
            cover: item.poster, dateAdded: new Date(item.dateAdded || 0)
        }));
        
        // 3. EDEBİYAT
        (AppState.literatureLibrary || []).forEach(item => allPosts.push({
            type: 'literature', 
            id: item.id, title: item.title, subtitle: item.author,
            meta: item.genre, year: item.year, rating: item.rating || 0,
            cover: item.cover, dateAdded: new Date(item.dateAdded || 0)
        }));

        // Dinamik Sıralama Başlangıcı
        if (!AppState.homeSortBy) {
            AppState.homeSortBy = localStorage.getItem('birYonuyleHomeSortBy') || 'dateAdded';
            AppState.homeSortDirection = localStorage.getItem('birYonuyleHomeSortDirection') || 'desc';
            if (typeof this.updateHomeSortClasses === 'function') this.updateHomeSortClasses();
        }

        allPosts.sort((a, b) => {
            const dir = AppState.homeSortDirection === 'desc' ? 1 : -1;
            if (AppState.homeSortBy === 'rating') return ((b.rating || 0) - (a.rating || 0)) * dir;
            if (AppState.homeSortBy === 'year') return ((parseInt(b.year) || 0) - (parseInt(a.year) || 0)) * dir;
            return (b.dateAdded.getTime() - a.dateAdded.getTime()) * dir; 
        });
        // Dinamik Sıralama Sonu

        if (allPosts.length === 0) {
            grid.innerHTML = '';
            emptyState.classList.remove('hidden');
            emptyState.classList.add('flex');
            return;
        }

        emptyState.classList.add('hidden');
        emptyState.classList.remove('flex');
        grid.innerHTML = '';

        const fragment = document.createDocumentFragment();

        const isXSmall = AppState.gridSize === 'xsmall';
        const isSmall = AppState.gridSize === 'small';
        
        const titleSize = isXSmall ? 'text-[8px] sm:text-[10px]' : (isSmall ? 'text-[10px] sm:text-xs' : 'text-xs sm:text-sm');
        const subSize = isXSmall ? 'text-[7px] sm:text-[9px]' : (isSmall ? 'text-[8.5px] sm:text-[11px]' : 'text-[10px] sm:text-xs');
        const metaSize = isXSmall ? 'text-[4px] sm:text-[6px]' : (isSmall ? 'text-[5px] sm:text-[8px]' : 'text-[6px] sm:text-[9px]');
        const padding = isXSmall ? 'p-0.5 sm:p-1' : (isSmall ? 'p-0.5 sm:p-1.5' : 'p-1 sm:p-2');
        const gapSize = isXSmall ? 'gap-0.5 sm:gap-1' : (isSmall ? 'gap-1' : 'gap-1.5 sm:gap-2');
        const circleSize = isXSmall ? 'w-5 h-5 sm:w-6 sm:h-6 text-[8px] sm:text-[10px] border' : (isSmall ? 'w-6 h-6 sm:w-7 sm:h-7 text-[10px] sm:text-[11px] border' : 'w-6 h-6 sm:w-8 sm:h-8 text-[10px] sm:text-xs border sm:border-2');

        allPosts.forEach(post => {
            const avg = post.rating || 0;
            // EKSİK OLAN borderColorClass BURAYA EKLENDİ VE HATA ÇÖZÜLDÜ
            const { bottomBgClass, borderColorClass, titleColorClass, subTextColorClass, genreBgClass, circleClass } = app.getThemeByRating(avg);

            let aspectRatioClass = 'pt-[100%]';
            if (post.type === 'cinema' || post.type === 'literature') {
                aspectRatioClass = 'pt-[150%]';
            }

            const card = document.createElement('div');
            card.className = `group flex flex-col rounded-xl overflow-hidden cursor-pointer active:scale-[0.98] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:brightness-105 dark:hover:shadow-[0_10px_20px_rgba(0,0,0,0.5)] shadow-md border ${borderColorClass} mt-auto`;
            
            if(post.type === 'library') {
                const originalItem = AppState.library.find(a => a.id === post.id);
                card.onclick = () => app.openAlbumModal(post.id, originalItem.title, originalItem.artist, originalItem.year);
            } else {
                card.onclick = () => app.openHomeItemModal(post.type, post.id);
            }

            const coverToUse = post.cover ? Utils.escapeHTML(post.cover) : 'https://placehold.co/400x400/ebe4dc/594636?text=Yok';

            card.innerHTML = `
                <div class="relative w-full ${aspectRatioClass} shrink-0 overflow-hidden bg-lightHighlight dark:bg-[#1a1a1a] border-b border-lightBorder/50 dark:border-white/5">
                    <img loading="lazy" src="${coverToUse}" onerror="this.src='https://placehold.co/400x400/ebe4dc/594636?text=Yok'; this.onerror=null;" alt="Cover" class="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105">
                </div>
                
                <div class="flex flex-col ${padding} ${bottomBgClass} w-full relative z-20">
                    <div class="flex justify-between items-start gap-2 w-full">
                        <div class="flex flex-col justify-start min-w-0 flex-1 overflow-hidden">
                            <div class="marquee-container w-full mb-0.5">
                                <h3 class="marquee-text font-bold ${titleColorClass} ${titleSize} leading-tight italic" title="${Utils.escapeHTML(post.title)}">${Utils.escapeHTML(post.title)}</h3>
                            </div>
                            <div class="marquee-container w-full mb-1 flex items-center min-w-0">
                                <span class="marquee-text ${subTextColorClass} ${subSize} leading-tight" title="${Utils.escapeHTML(post.subtitle || '-')}">${Utils.escapeHTML(post.subtitle || '-')}</span>
                            </div>
                        </div>
                        <div class="shrink-0 flex flex-col items-center justify-start pt-0.5 ml-1">
                            <div class="flex items-center justify-center rounded-full font-black ${circleSize} ${circleClass} shadow-sm">
                                ${avg > 0 ? avg : '-'}
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-between items-end gap-1 w-full mt-1.5">
                        <span class="${metaSize} font-semibold ${subTextColorClass} truncate text-left" style="max-width: 70%;">${Utils.escapeHTML(post.meta || '-')}</span>
                        <div class="flex gap-1 shrink-0 items-center">
                            <span class="${metaSize} font-bold ${genreBgClass} px-1.5 py-0.5 rounded-md text-right">${Utils.escapeHTML(post.year || '-')}</span>
                        </div>
                    </div>
                </div>
            `;
            fragment.appendChild(card);
        });
        grid.appendChild(fragment);
    },

    renderLibrary() {
        const grid = document.getElementById('library-grid'), emptyState = document.getElementById('empty-library-state');
        if(!grid || !emptyState) return;
        
        const fGroup = AppState.filterGroup;
        const fYear = AppState.filterYear;
        const fGenre = AppState.filterGenre;
        const fLabel = AppState.filterLabel;
        
        document.getElementById('icon-filter-group')?.classList.toggle('text-primary', !!fGroup);
        document.getElementById('icon-filter-genre')?.classList.toggle('text-primary', !!fGenre);
        document.getElementById('icon-filter-year')?.classList.toggle('text-primary', !!fYear);
        document.getElementById('icon-filter-label')?.classList.toggle('text-primary', !!fLabel);

        let filtered = AppState.library.filter(a => {
            if (fGroup && a.artist !== fGroup) return false;
            if (fYear) {
                if (fYear.endsWith('s')) {
                    const targetDecade = parseInt(fYear);
                    const albumYear = parseInt(a.year);
                    if (isNaN(albumYear) || albumYear < targetDecade || albumYear >= targetDecade + 10) return false;
                } else if (a.year !== fYear) {
                    return false;
                }
            }
            if (fGenre && (!a.genres || !a.genres.some(g => g.toLowerCase() === fGenre.toLowerCase()))) return false;
            if (fLabel && a.label !== fLabel) return false;
            return true;
        });
        
        filtered.sort((a, b) => {
            const dir = AppState.sortDirection === 'desc' ? 1 : -1;
            if (AppState.sortBy === 'rating') return ((b.averageScore || 0) - (a.averageScore || 0)) * dir;
            if (AppState.sortBy === 'year') return ((parseInt(b.year) || 0) - (parseInt(a.year) || 0)) * dir;
            return (new Date(b.dateAdded || 0) - new Date(a.dateAdded || 0)) * dir;
        });

        if (AppState.library.length === 0) { grid.innerHTML = ''; emptyState.classList.remove('hidden'); emptyState.classList.add('flex'); return; }
        emptyState.classList.add('hidden'); emptyState.classList.remove('flex'); grid.innerHTML = '';
        if (filtered.length === 0) { grid.innerHTML = `<div class="col-span-full text-center py-10 text-gray-500">${t('no_data')}</div>`; return; }

        const fragment = document.createDocumentFragment();
        
        const isXSmall = AppState.gridSize === 'xsmall';
        const isSmall = AppState.gridSize === 'small';
        
        const titleSize = isXSmall ? 'text-[8px] sm:text-[10px]' : (isSmall ? 'text-[10px] sm:text-xs' : 'text-xs sm:text-sm');
        const artistSize = isXSmall ? 'text-[7px] sm:text-[9px]' : (isSmall ? 'text-[8.5px] sm:text-[11px]' : 'text-[10px] sm:text-xs');
        const metaSize = isXSmall ? 'text-[5px] sm:text-[8px]' : (isSmall ? 'text-[6px] sm:text-[9px]' : 'text-[7.5px] md:text-[10px]');
        const padding = isXSmall ? 'p-0.5 sm:p-1.5' : (isSmall ? 'p-1 sm:p-2' : 'p-1.5 md:p-3');
        const gapSize = isXSmall ? 'gap-1' : (isSmall ? 'gap-1.5' : 'gap-2 md:gap-3');
        const circleSize = isXSmall ? 'w-5 h-5 sm:w-6 sm:h-6 text-[8px] sm:text-[10px] border' : (isSmall ? 'w-6 h-6 sm:w-8 sm:h-8 text-[10px] sm:text-xs border sm:border-2' : 'w-7 h-7 md:w-10 md:h-10 text-[10px] md:text-sm border md:border-2');

        const noCoverText = t('no_cover').replace(/ /g, '+');

        filtered.forEach(album => {
            const avg = album.averageScore || 0;
            const rawGenre = (album.genres && album.genres.length > 0) ? album.genres[0] : t('unknown');
            const displayGenre = tGenre(rawGenre);

            const hasNotes = album.note || (album.tracks && album.tracks.some(tr => tr.note));
            const { bottomBgClass, borderColorClass, titleColorClass, subTextColorClass, genreBgClass, circleClass } = app.getThemeByRating(avg);

            const card = document.createElement('div');
            card.className = `group flex flex-col rounded-xl overflow-hidden cursor-pointer active:scale-[0.98] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:brightness-105 dark:hover:shadow-[0_10px_20px_rgba(0,0,0,0.5)] shadow-md border ${borderColorClass} mt-auto`;
            card.onclick = () => this.openAlbumModal(album.id, album.title, album.artist, album.year);

            const coverToUse = Utils.escapeHTML(album.customCoverUrl || album.coverUrl);

            card.innerHTML = `
                <div class="relative w-full pt-[100%] shrink-0 overflow-hidden bg-lightHighlight dark:bg-[#1a1a1a] border-b border-lightBorder/50 dark:border-white/5">
                    <img loading="lazy" src="${coverToUse}" onerror="this.src='https://placehold.co/400x400/ebe4dc/594636?text=Yok'; this.onerror=null;" alt="Cover" class="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105">
                </div>
                <div class="flex flex-col ${padding} ${bottomBgClass} w-full relative z-20">
                    <div class="flex justify-between items-start gap-2 w-full">
                        <div class="flex flex-col justify-start min-w-0 flex-1 overflow-hidden">
                            <div class="marquee-container w-full mb-0.5">
                                <h3 class="marquee-text font-bold ${titleColorClass} ${titleSize} leading-tight italic" title="${Utils.escapeHTML(album.title)}">${Utils.escapeHTML(album.title)}</h3>
                            </div>
                            <div class="marquee-container w-full mb-1 flex items-center min-w-0">
                                <button onclick="event.stopPropagation(); app.searchFromLink(this.textContent)" class="marquee-text ${subTextColorClass} ${artistSize} hover:underline cursor-pointer text-left" title="${Utils.escapeHTML(album.artist)}">${Utils.escapeHTML(album.artist)}</button>
                            </div>
                        </div>
                        <div class="shrink-0 flex flex-col items-center justify-start pt-0.5 ml-1">
                            <div class="flex items-center justify-center rounded-full font-black ${circleSize} ${circleClass} shadow-sm">
                                ${avg > 0 ? avg : '-'}
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-between items-end gap-1 w-full mt-1.5">
                        <span class="${metaSize} font-semibold ${subTextColorClass} truncate text-left" style="max-width: 70%;">${Utils.escapeHTML(displayGenre)}</span>
                        <div class="flex gap-1 shrink-0 items-center">
                            <span class="${metaSize} font-bold ${genreBgClass} px-1.5 py-0.5 rounded-md text-right">${Utils.escapeHTML(album.year)}</span>
                        </div>
                    </div>
                </div>
            `;
            fragment.appendChild(card);
        });
        grid.appendChild(fragment);
    },

    updateSearchPlaceholder() {
        const inp = document.getElementById('search-input');
        const searchTypes = document.getElementsByName('searchType');
        let tType = 'artist';
        for(let st of searchTypes) { if(st.checked) tType = st.value; }
        if(inp) inp.placeholder = tType === 'artist' ? t('placeholder_artist') : t('placeholder_album');
    },
    
    async search() {
        if (AppState.isSearching) return;
        const input = document.getElementById('search-input').value.trim(); if (!input) return;
        AppState.isSearching = true; 
        const btnSearch = document.getElementById('search-btn');
        if(btnSearch) btnSearch.disabled = true;
        
        let searchType = 'artist';
        const searchTypes = document.getElementsByName('searchType');
        for(let st of searchTypes) { if(st.checked) searchType = st.value; }
        
        const resCon = document.getElementById('search-results');
        const load = document.getElementById('search-loading');
        const statText = document.getElementById('search-status-text');
        
        if(resCon) resCon.innerHTML = ''; 
        if(load) { load.classList.remove('hidden'); load.classList.add('flex'); }
        if(statText) statText.textContent = searchType === 'artist' ? t('searching_artist') : t('searching_albums');

        try {
            if (searchType === 'album') {
                const res = await fetch(`https://musicbrainz.org/ws/2/release-group/?query=${encodeURIComponent(input)} AND (type:album OR type:ep)&fmt=json&limit=50`);
                const data = await res.json();
                const albums = (data['release-groups'] || []).filter(rg => 
                    (rg['primary-type'] === 'Album' || rg['primary-type'] === 'EP') && 
                    (!rg['secondary-types'] || rg['secondary-types'].length === 0)
                ).slice(0, 15);
                
                if (albums.length === 0 && resCon) { resCon.innerHTML = `<div class="col-span-full text-center p-8 text-gray-500">${t('no_results')}</div>`; return; }
                this.renderSearchResults(albums);
            } else {
                const aRes = await fetch(`https://musicbrainz.org/ws/2/artist/?query=${encodeURIComponent(input)}&fmt=json&limit=1`);
                const aData = await aRes.json();
                if ((!aData.artists || aData.artists.length === 0) && resCon) { resCon.innerHTML = `<div class="col-span-full text-center p-8 text-gray-500">${t('no_results')}</div>`; return; }
                const artist = aData.artists[0]; 
                if(statText) statText.textContent = `${t('fetching_albums')} "${artist.name}"...`;
                
                const relRes = await fetch(`https://musicbrainz.org/ws/2/release-group?artist=${artist.id}&type=album|ep&fmt=json&limit=100`);
                const rData = await relRes.json();
                const albums = (rData['release-groups'] || []).filter(rg => 
                    (rg['primary-type'] === 'Album' || rg['primary-type'] === 'EP') && 
                    (!rg['secondary-types'] || rg['secondary-types'].length === 0)
                );
                
                if (albums.length === 0 && resCon) { resCon.innerHTML = `<div class="col-span-full text-center p-8 text-gray-500">${t('no_studio_albums')}</div>`; return; }
                this.renderSearchResults(albums.sort((a,b)=>(b['first-release-date']||'0000').localeCompare(a['first-release-date']||'0000')), artist.name);
            }
        } catch (e) { showToast(t('toast_conn_error'), "error"); } 
        finally { 
            if(load) { load.classList.add('hidden'); load.classList.remove('flex'); }
            AppState.isSearching = false; 
            if(btnSearch) btnSearch.disabled = false; 
        }
    },

    updateCinemaSearchPlaceholder() {
        const inp = document.getElementById('cinema-search-input');
        const searchTypes = document.getElementsByName('cinemaSearchType');
        let tType = 'movie';
        for(let st of searchTypes) { if(st.checked) tType = st.value; }
        if(inp) inp.placeholder = tType === 'director' ? 'Yönetmen adı yazın...' : 'Film adı yazın...';
    },

    async searchCinema() {
        if (this.isSearchingCinema) return;
        const input = document.getElementById('cinema-search-input').value.trim(); 
        if (!input) return;
        
        this.isSearchingCinema = true; 
        const btnSearch = document.getElementById('cinema-search-btn');
        if(btnSearch) btnSearch.disabled = true;
        
        let searchType = 'movie';
        const searchTypes = document.getElementsByName('cinemaSearchType');
        for(let st of searchTypes) { if(st.checked) searchType = st.value; }
        
        const resCon = document.getElementById('cinema-search-results');
        const load = document.getElementById('cinema-search-loading');
        const statText = document.getElementById('cinema-search-status-text');
        
        if(resCon) resCon.innerHTML = ''; 
        if(load) { load.classList.remove('hidden'); load.classList.add('flex'); }
        if(statText) statText.textContent = searchType === 'director' ? 'Yönetmen aranıyor...' : 'Filmler aranıyor...';

        try {
            // TMDB (The Movie Database) Açık API Entegrasyonu
            const TMDB_API_KEY = '3fd2be6f0c70a2a598f084ddfb75487c'; 
            let movies = [];

            if (searchType === 'movie') {
                // Film Adı ile arama
                const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(input)}&language=tr-TR&page=1`);
                const data = await res.json();
                movies = data.results || [];
            } else {
                // Yönetmen (Kişi) arama
                const personRes = await fetch(`https://api.themoviedb.org/3/search/person?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(input)}&language=tr-TR&page=1`);
                const personData = await personRes.json();
                
                if (personData.results && personData.results.length > 0) {
                    const personId = personData.results[0].id;
                    const directorName = personData.results[0].name;
                    
                    // Yönetmenin filmlerini getir
                    const creditsRes = await fetch(`https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=${TMDB_API_KEY}&language=tr-TR`);
                    const creditsData = await creditsRes.json();
                    
                    // Sadece yönettiği filmleri (uzun metraj) filtrele: "video" olmayan, belgesel/kısa film kirliliğini engelleyen filtre
                    movies = (creditsData.crew || []).filter(crew => 
                        crew.job === 'Director' && 
                        crew.video === false && 
                        (crew.popularity > 2.0 || crew.vote_count > 10 || (crew.release_date && new Date(crew.release_date) > new Date())) &&
                        !crew.title.toLowerCase().includes('making of') &&
                        !crew.title.toLowerCase().includes('short cuts')
                    );
                    
                    // Her filme yönetmen adını ekle
                    movies.forEach(m => m.directorName = directorName);
                    
                    // Tekrarlanan filmleri (farklı rolleri varsa) temizle ve popülerliğe göre sırala
                    movies = movies.filter((movie, index, self) => index === self.findIndex((t) => t.id === movie.id))
                                   .sort((a,b) => b.popularity - a.popularity);
                }
            }
            
            if (movies.length === 0 && resCon) { 
                resCon.innerHTML = `<div class="col-span-full text-center p-8 text-gray-500">Bulunamadı. Farklı bir terim deneyin.</div>`; 
                return; 
            }
            
            this.renderCinemaSearchResults(movies, searchType === 'movie' ? null : 'director');
        } catch (e) { 
            showToast("Arama sırasında hata oluştu.", "error"); 
            console.error(e);
        } finally { 
            if(load) { load.classList.add('hidden'); load.classList.remove('flex'); }
            this.isSearchingCinema = false; 
            if(btnSearch) btnSearch.disabled = false; 
        }
    },

    renderCinemaSearchResults(movies, searchMode) {
        const con = document.getElementById('cinema-search-results'); 
        if(!con) return;
        con.innerHTML = '';
        const frag = document.createDocumentFragment();

        // En alakalı 30 sonucu göster
        movies.slice(0, 30).forEach(movie => {
            const title = Utils.escapeHTML(movie.title || movie.original_title || 'Bilinmeyen Film');
            const director = Utils.escapeHTML(movie.directorName || (searchMode === 'director' ? '' : 'Yönetmen: Detayda yüklenecek'));
            const year = movie.release_date ? movie.release_date.substring(0, 4) : '-';
            const coverUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '';
            const description = movie.overview || '';
            
            const inLib = (AppState.cinemaLibrary || []).some(a => a.title === title);

            const card = document.createElement('div');
            card.className = `bg-white dark:bg-surface p-2.5 rounded-xl border ${inLib ? 'border-purple-500' : 'border-lightBorder dark:border-gray-800'} flex gap-3 active:scale-[0.98] transition-transform shadow-sm cursor-pointer hover:bg-lightHighlight dark:hover:bg-surfaceHover`;
            
            card.onclick = async () => {
                this.openCinemaModal();
                
                document.getElementById('cinema-title').value = title;
                document.getElementById('cinema-director').value = movie.directorName || 'Yükleniyor...';
                document.getElementById('cinema-year').value = year;
                document.getElementById('cinema-poster').value = coverUrl;
                document.getElementById('cinema-modal-cover').src = coverUrl || 'https://placehold.co/400x600/ebe4dc/594636?text=Yok';
                document.getElementById('cinema-review').innerHTML = description;
                
                const existingFilm = (AppState.cinemaLibrary || []).find(a => a.title === title);
                if (existingFilm) {
                    AppState.currentCinemaId = existingFilm.id;
                    this.currentCinemaRating = existingFilm.rating || 0;
                    this.renderCinemaRating();
                    document.getElementById('cinema-genre').value = existingFilm.genre || '';
                    document.getElementById('cinema-country').value = existingFilm.country || ''; // YENİ EKLENDİ
                    document.getElementById('cinema-review').innerHTML = existingFilm.review || description;
                    document.querySelectorAll('.cinema-delete-btn').forEach(b => b.classList.remove('hidden'));
                    
                    if (existingFilm.cast && existingFilm.cast.length > 0) {
                        document.getElementById('cinema-cast-list').innerHTML = '';
                        existingFilm.cast.forEach(c => this.addCinemaCastRow(c));
                    }
                }
                
                // Film kredilerini (Yönetmen ve Oyuncular) getir
                try {
                    const TMDB_API_KEY = '3fd2be6f0c70a2a598f084ddfb75487c';
                    const credRes = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${TMDB_API_KEY}`);
                    const credData = await credRes.json();
                    
                    if (!movie.directorName) {
                        const dir = credData.crew.find(c => c.job === 'Director');
                        document.getElementById('cinema-director').value = dir ? dir.name : 'Bilinmiyor';
                    }
                    
                    // Eğer arşivde yoksa veya arşivdeki filmde cast ekli değilse TMDB'den ilk 5 oyuncuyu ekle
                    if (!existingFilm || !existingFilm.cast || existingFilm.cast.length === 0) {
                        document.getElementById('cinema-cast-list').innerHTML = '';
                        const topCast = credData.cast.slice(0, 5);
                        if(topCast.length > 0) {
                            topCast.forEach(c => this.addCinemaCastRow(c.name));
                        } else {
                            this.addCinemaCastRow();
                        }
                    }
                } catch(e) {
                    if (!movie.directorName) document.getElementById('cinema-director').value = 'Bilinmiyor';
                }
            };

            card.innerHTML = `
                <img loading="lazy" src="${coverUrl}" onerror="this.src='https://placehold.co/150x225/ebe4dc/594636?text=Yok'; this.onerror=null;" class="w-16 h-24 bg-lightHighlight rounded-lg object-cover flex-shrink-0">
                <div class="flex flex-col justify-center overflow-hidden flex-grow py-1">
                    <h4 class="font-bold text-gray-900 dark:text-white truncate text-sm md:text-base italic">${title}</h4>
                    <p class="text-xs text-gray-500 truncate mb-1">${director}</p>
                    <div class="flex gap-1.5 mt-auto">
                        <span class="text-[10px] bg-lightBg dark:bg-darker px-2 py-0.5 rounded text-gray-600 font-bold">${year}</span>
                        ${inLib ? `<span class="text-[10px] bg-purple-500/10 text-purple-600 px-2 py-0.5 rounded font-bold flex items-center gap-1"><i class="ph-fill ph-check-circle"></i> Eklendi</span>` : ''}
                    </div>
                </div>`;
            frag.appendChild(card);
        });
        con.appendChild(frag);
    },

    openCinemaModal() {
        const modal = document.getElementById('cinema-modal');
        if(!modal) return;
        
        // Formu temizle ve yeni girdileri sıfırla
        document.getElementById('cinema-title').value = '';
        document.getElementById('cinema-director').value = '';
        document.getElementById('cinema-year').value = '';
        document.getElementById('cinema-genre').value = '';
        document.getElementById('cinema-country').value = ''; 
        document.getElementById('cinema-duration').value = ''; // SÜRE EKLENDİ
        document.getElementById('cinema-poster').value = '';
        document.getElementById('cinema-modal-cover').src = 'https://placehold.co/400x600/ebe4dc/594636?text=Yok';
        document.getElementById('cinema-review').innerHTML = '';
        document.querySelectorAll('.cinema-delete-btn').forEach(b => b.classList.add('hidden'));
        document.getElementById('cinema-cover-edit-section').classList.add('hidden');
        
        const fileInput = document.getElementById('cinema-poster-file');
        if (fileInput) fileInput.value = '';

        document.getElementById('cinema-cast-list').innerHTML = '';
        this.addCinemaCastRow();
        
        this.currentCinemaRating = 0;
        this.renderCinemaRating();
        AppState.currentCinemaId = null; 
        
        // ++ KÜNYE KİLİDİ ++
            this.isKünyeLocked = true;
            if (typeof this.applyKünyeLockState === 'function') this.applyKünyeLockState();

        modal.classList.remove('hidden');
        modal.classList.add('flex');
        
        requestAnimationFrame(() => {
            requestAnimationFrame(() => { 
                modal.classList.remove('opacity-0'); 
                const content = modal.querySelector('.modal-content');
                if (content) {
                    content.classList.remove('scale-95', 'opacity-0');
                    content.classList.add('scale-100', 'opacity-100');
                }
            });
        });
    },

    closeCinemaModal() {
        const modal = document.getElementById('cinema-modal');
        if(!modal) return;
        const content = modal.querySelector('.modal-content');
        
        modal.classList.add('opacity-0');
        document.getElementById('cinema-slider')?.classList.remove('slide-left');
        if (content) {
            content.classList.remove('scale-100', 'opacity-100');
            content.classList.add('scale-95', 'opacity-0');
        }
        
        setTimeout(() => { 
            modal.classList.add('hidden'); 
            modal.classList.remove('flex');
        }, 300);
    },

    renderCinemaRating() {
        const container = document.getElementById('cinema-rating-container');
        if(!container) return;
        container.innerHTML = this.generateStarsHTML(this.currentCinemaRating, 'setCinemaRating');
        
        // Rozet içindeki yazıyı güncelle
        const scoreSpan = document.getElementById('modal-cinema-avg-score');
        if (scoreSpan) {
            scoreSpan.textContent = this.currentCinemaRating > 0 ? this.currentCinemaRating : '-';
        }

        // Rozetin rengini anasayfa kartlarıyla aynı tema kurallarına göre güncelle
        const circleEl = document.getElementById('cinema-avg-score-circle');
        if (circleEl) {
            const theme = this.getThemeByRating(this.currentCinemaRating);
            if (this.currentCinemaRating > 0) {
                circleEl.className = `flex items-center justify-center rounded-full font-black w-10 h-10 md:w-12 md:h-12 text-sm md:text-base border-2 shadow-sm transition-colors duration-300 ${theme.bottomBgClass} ${theme.titleColorClass} border-white/20 cursor-pointer`;
            } else {
                circleEl.className = `flex items-center justify-center rounded-full font-black w-10 h-10 md:w-12 md:h-12 text-sm md:text-base border-2 shadow-sm transition-colors duration-300 bg-lightBg text-gray-500 border-lightBorder dark:bg-darker dark:text-gray-500 dark:border-gray-800 cursor-pointer`;
            }
        }
    },

    setCinemaRating(r) {
        this.currentCinemaRating = this.currentCinemaRating === r ? 0 : r;
        this.renderCinemaRating();
    },

    saveCinema() {
        const title = document.getElementById('cinema-title').value.trim();
        const director = document.getElementById('cinema-director').value.trim();
        const year = document.getElementById('cinema-year').value.trim();
        const genre = document.getElementById('cinema-genre').value.trim();
        const country = document.getElementById('cinema-country').value.trim(); 
        const duration = document.getElementById('cinema-duration').value.trim(); // SÜRE EKLENDİ
        const poster = document.getElementById('cinema-poster').value.trim();
        const review = document.getElementById('cinema-review').innerHTML.trim();
        
        const castInputs = document.querySelectorAll('.cinema-cast-input');
        const cast = [];
        castInputs.forEach(input => {
            if (input.value.trim()) cast.push(input.value.trim());
        });
        
        if(!title) {
            showToast("Film adı zorunludur.", "error");
            return;
        }
        
        if (!AppState.cinemaLibrary) AppState.cinemaLibrary = [];
        
        const isEditing = AppState.currentCinemaId != null;
        const filmId = isEditing ? AppState.currentCinemaId : 'cinema_' + Date.now();

        const filmData = {
            id: filmId,
            title,
            director,
            year,
            genre,
            country, 
            duration, // SÜRE EKLENDİ
            poster,
            review,
            cast,
            rating: this.currentCinemaRating,
            dateAdded: new Date().toISOString()
        };
        
        if (isEditing) {
            // Var olanı güncelle
            const idx = AppState.cinemaLibrary.findIndex(f => f.id === filmId);
            if(idx > -1) {
                // Tarihi koruyalım
                filmData.dateAdded = AppState.cinemaLibrary[idx].dateAdded || filmData.dateAdded;
                AppState.cinemaLibrary[idx] = filmData;
            }
        } else {
            // Yeni ekle
            AppState.cinemaLibrary.unshift(filmData);
        }
        
        // Firebase'e senkronize et
        this.saveCinemaData(filmData);
        
        this.renderCinemaGrid();
        showToast(`"${title}" başarıyla kaydedildi!`, "success");
        this.closeCinemaModal();
    },

    deleteCinema() {
        if (!AppState.currentCinemaId) return;
        
        AppState.cinemaLibrary = AppState.cinemaLibrary.filter(f => f.id !== AppState.currentCinemaId);
        this.saveToLocal();
        
        const user = auth.currentUser;
        if (user) {
            const docId = `${user.uid}_${AppState.currentCinemaId}`;
            deleteDoc(doc(db, 'kitaplik', docId)).catch(e => console.error(e));
        }
        
        this.renderCinemaGrid();
        showToast("Film silindi.", "info");
        this.closeCinemaModal();
    },

    toggleCinemaCoverEdit() {
        const sec = document.getElementById('cinema-cover-edit-section');
        if(sec) sec.classList.toggle('hidden');
    },

    applyCinemaCover() {
        const input = document.getElementById('cinema-poster');
        const fileInput = document.getElementById('cinema-poster-file');
        const img = document.getElementById('cinema-modal-cover');
        
        if (fileInput && fileInput.files && fileInput.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const url = e.target.result;
                if(input) input.value = url;
                if(img) img.src = url;
                document.getElementById('cinema-cover-edit-section').classList.add('hidden');
            };
            reader.readAsDataURL(fileInput.files[0]);
        } else if (input && img) {
            const url = input.value.trim() || 'https://placehold.co/400x600/ebe4dc/594636?text=Yok';
            img.src = url;
            document.getElementById('cinema-cover-edit-section').classList.add('hidden');
        }
    },

    addCinemaCastRow(name = '') {
        const list = document.getElementById('cinema-cast-list');
        if(!list) return;
        const row = document.createElement('div');
        row.className = "flex items-center gap-2 group";
        row.innerHTML = `
            <i class="ph-bold ph-user text-gray-400"></i>
            <input type="text" value="${Utils.escapeHTML(name)}" placeholder="Oyuncu Adı" class="cinema-cast-input w-full text-xs font-medium text-gray-800 dark:text-gray-200 bg-white dark:bg-darker border border-lightBorder dark:border-gray-800 rounded-lg px-3 py-1.5 outline-none focus:border-purple-500 transition-colors shadow-sm">
            <button onclick="this.parentElement.remove()" class="text-gray-400 hover:text-red-500 transition-colors p-1 opacity-50 hover:opacity-100"><i class="ph-bold ph-trash"></i></button>
        `;
        list.appendChild(row);
    },

    openCinemaDropdown(event, type) {
        event.stopPropagation();
        const dd = document.getElementById('custom-dropdown');
        if(!dd) return;
        
        if (!dd.classList.contains('hidden') && this.currentDropdownType === `Cinema${type}`) {
            this.closeDropdown(); return;
        }

        const btn = event.currentTarget;
        const rect = btn.getBoundingClientRect();
        
        let items = new Set();
        let defLabel = '';
        
        if (type === 'Director') {
            (AppState.cinemaLibrary || []).forEach(a => { if(a.director) items.add(a.director); });
            defLabel = 'Tümü (Yönetmen)';
        } else if (type === 'Genre') {
            (AppState.cinemaLibrary || []).forEach(a => { 
                if(a.genre) a.genre.split(',').forEach(g => items.add(g.trim())); 
            });
            defLabel = 'Tümü (Tür)';
        } else if (type === 'Year') {
            (AppState.cinemaLibrary || []).forEach(a => { 
                if(a.year) {
                    items.add(a.year); 
                    const decade = Math.floor(parseInt(a.year) / 10) * 10;
                    if (!isNaN(decade)) items.add(`${decade}ler`);
                }
            });
            defLabel = 'Tümü (Yıl)';
        } else if (type === 'Country') {
            defLabel = 'Tümü (Ülke)';
        }

        const currentVal = AppState[`cinemaFilter${type}`] || '';
        
        let html = `
            <div onclick="app.setCinemaFilter('${type}', '')" class="px-5 py-3 hover:bg-lightHighlight dark:hover:bg-surfaceHover cursor-pointer text-sm font-semibold flex justify-between items-center transition-colors border-b border-lightBorder/30 dark:border-gray-800/50 ${currentVal === '' ? 'text-purple-600' : 'text-gray-700 dark:text-gray-300'}">
                <span>${defLabel}</span>
                ${currentVal === '' ? '<i class="ph-bold ph-check text-lg"></i>' : ''}
            </div>
        `;
        
        let sortedItems = Array.from(items);
        if (type === 'Year') {
            sortedItems.sort((a, b) => {
                const aVal = a.toString().endsWith('ler') ? parseInt(a) + 0.5 : parseInt(a);
                const bVal = b.toString().endsWith('ler') ? parseInt(b) + 0.5 : parseInt(b);
                return bVal - aVal;
            });
        } else {
            sortedItems.sort();
        }

        sortedItems.forEach(item => {
            const isSelected = currentVal === item;
            const isDecade = type === 'Year' && item.toString().endsWith('ler');
            
            html += `
                <div onclick="app.setCinemaFilter('${type}', '${Utils.escapeHTML(item)}')" class="px-5 py-3 hover:bg-lightHighlight dark:hover:bg-surfaceHover cursor-pointer text-sm ${isDecade ? 'font-bold bg-lightBg/50 dark:bg-surface/50 border-y border-lightBorder/30 dark:border-gray-800/50' : 'font-medium'} flex justify-between items-center transition-colors ${isSelected ? 'text-purple-600' : 'text-gray-600 dark:text-gray-400'}">
                    <span class="truncate pr-4 ${isDecade ? 'text-gray-800 dark:text-gray-200' : ''}">${Utils.escapeHTML(item)}</span>
                    ${isSelected ? '<i class="ph-bold ph-check text-lg"></i>' : ''}
                </div>
            `;
        });

        dd.innerHTML = html;
        this.currentDropdownType = `Cinema${type}`;
        
        dd.classList.remove('hidden');
        
        let top = rect.bottom + 10;
        let left = rect.left;
        const ddWidth = Math.max(200, btn.offsetWidth * 1.5);
        dd.style.minWidth = `${ddWidth}px`;
        if (left + ddWidth > window.innerWidth) left = window.innerWidth - ddWidth - 16;
        if (top + 250 > window.innerHeight) top = rect.top - dd.offsetHeight - 10; 
        dd.style.top = `${top}px`;
        dd.style.left = `${Math.max(16, left)}px`;
        
        requestAnimationFrame(() => dd.classList.remove('opacity-0'));
    },
    
    setCinemaFilter(type, value) {
        AppState[`cinemaFilter${type}`] = value;
        this.closeDropdown();
        this.renderCinemaGrid();
    },

    toggleCinemaSort(type) {
        if (AppState.cinemaSortBy === type) AppState.cinemaSortDirection = AppState.cinemaSortDirection === 'desc' ? 'asc' : 'desc';
        else { AppState.cinemaSortBy = type; AppState.cinemaSortDirection = 'desc'; }
        localStorage.setItem('birYonuyleCinemaSortBy', AppState.cinemaSortBy);
        localStorage.setItem('birYonuyleCinemaSortDirection', AppState.cinemaSortDirection);
        this.updateCinemaSortClasses(); 
        if (AppState.currentView === 'cinema') this.renderCinemaGrid();
    },

    updateCinemaSortClasses() {
        ['dateAdded', 'year', 'rating'].forEach(type => {
            const btn = document.getElementById(`btn-cinema-sort-${type}`); 
            const iconDir = document.getElementById(`icon-cinema-sort-${type}-dir`);
            if (!btn || !iconDir) return;
            if (AppState.cinemaSortBy === type) {
                btn.classList.add('text-purple-600', 'bg-purple-500/10'); btn.classList.remove('text-gray-500');
                iconDir.className = `ph-bold ph-arrow-${AppState.cinemaSortDirection === 'desc' ? 'down' : 'up'} text-[10px]`; iconDir.style.opacity = '1';
            } else {
                btn.classList.remove('text-purple-600', 'bg-purple-500/10'); btn.classList.add('text-gray-500');
                iconDir.className = 'ph-bold ph-arrow-down text-[10px]'; iconDir.style.opacity = '0.3';
            }
        });
    },

    renderCinemaGrid() {
        const grid = document.getElementById('cinema-grid');
        const emptyState = document.getElementById('cinema-empty-state');
        if(!grid || !emptyState) return;
        
        const fDirector = AppState.cinemaFilterDirector;
        const fGenre = AppState.cinemaFilterGenre;
        const fYear = AppState.cinemaFilterYear;
        const fCountry = AppState.cinemaFilterCountry;

        document.getElementById('icon-filter-cinema-director')?.classList.toggle('text-purple-600', !!fDirector);
        document.getElementById('icon-filter-cinema-genre')?.classList.toggle('text-purple-600', !!fGenre);
        document.getElementById('icon-filter-cinema-year')?.classList.toggle('text-purple-600', !!fYear);
        document.getElementById('icon-filter-cinema-country')?.classList.toggle('text-purple-600', !!fCountry);

        let filtered = (AppState.cinemaLibrary || []).filter(a => {
            if (fDirector && a.director !== fDirector) return false;
            if (fYear) {
                if (fYear.endsWith('ler')) {
                    const targetDecade = parseInt(fYear);
                    const filmYear = parseInt(a.year);
                    if (isNaN(filmYear) || filmYear < targetDecade || filmYear >= targetDecade + 10) return false;
                } else if (a.year !== fYear) {
                    return false;
                }
            }
            if (fGenre && (!a.genre || !a.genre.toLowerCase().includes(fGenre.toLowerCase()))) return false;
            return true;
        });

        // Initialize sort defaults if empty
        if (!AppState.cinemaSortBy) {
            AppState.cinemaSortBy = localStorage.getItem('birYonuyleCinemaSortBy') || 'dateAdded';
            AppState.cinemaSortDirection = localStorage.getItem('birYonuyleCinemaSortDirection') || 'desc';
            this.updateCinemaSortClasses();
        }

        filtered.sort((a, b) => {
            const dir = AppState.cinemaSortDirection === 'desc' ? 1 : -1;
            if (AppState.cinemaSortBy === 'rating') return ((b.rating || 0) - (a.rating || 0)) * dir;
            if (AppState.cinemaSortBy === 'year') return ((parseInt(b.year) || 0) - (parseInt(a.year) || 0)) * dir;
            return (new Date(b.dateAdded || 0) - new Date(a.dateAdded || 0)) * dir;
        });

        if (!AppState.cinemaLibrary || AppState.cinemaLibrary.length === 0) {
            grid.innerHTML = '';
            emptyState.classList.remove('hidden');
            emptyState.classList.add('flex');
            return;
        }
        
        emptyState.classList.add('hidden');
        emptyState.classList.remove('flex');
        grid.innerHTML = '';

        if (filtered.length === 0) { 
            grid.innerHTML = `<div class="col-span-full text-center py-10 text-gray-500">Kriterlere uygun film bulunamadı.</div>`; 
            return; 
        }
        
        const fragment = document.createDocumentFragment();
        
        const isXSmall = AppState.cinemaGridSize === 'xsmall';
        const isSmall = AppState.cinemaGridSize === 'small';
        
        const titleSize = isXSmall ? 'text-[7px] sm:text-[10px]' : (isSmall ? 'text-[8px] sm:text-xs' : 'text-[10px] md:text-sm');
        const directorSize = isXSmall ? 'text-[6px] sm:text-[9px]' : (isSmall ? 'text-[7px] sm:text-[10px]' : 'text-[8.5px] md:text-xs');
        const metaSize = isXSmall ? 'text-[5px] sm:text-[8px]' : (isSmall ? 'text-[6px] sm:text-[9px]' : 'text-[7.5px] md:text-[10px]');
        const padding = isXSmall ? 'p-0.5 sm:p-1.5' : (isSmall ? 'p-1 sm:p-2' : 'p-1.5 md:p-3');
        const gapSize = isXSmall ? 'gap-1' : (isSmall ? 'gap-1.5' : 'gap-2 md:gap-3');
        const circleSize = isXSmall ? 'w-5 h-5 sm:w-6 sm:h-6 text-[8px] sm:text-[10px] border' : (isSmall ? 'w-6 h-6 sm:w-8 sm:h-8 text-[10px] sm:text-xs border sm:border-2' : 'w-7 h-7 md:w-10 md:h-10 text-[10px] md:text-sm border md:border-2');

        filtered.forEach(film => {
            const avg = film.rating || 0;
            const hasNotes = film.review && film.review.trim() !== '';

            const { bottomBgClass, borderColorClass, titleColorClass, subTextColorClass, genreBgClass, circleClass } = app.getThemeByRating(avg);

            const card = document.createElement('div');
            card.className = `group flex flex-col rounded-xl overflow-hidden cursor-pointer active:scale-[0.98] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:brightness-105 dark:hover:shadow-[0_10px_20px_rgba(0,0,0,0.5)] shadow-md border ${borderColorClass} mt-auto`;
            
            card.onclick = () => {
                this.openCinemaModal();
                setTimeout(() => {
                    document.getElementById('cinema-title').value = film.title || '';
                    document.getElementById('cinema-director').value = film.director || '';
                    document.getElementById('cinema-year').value = film.year || '';
                    document.getElementById('cinema-genre').value = film.genre || '';
                    document.getElementById('cinema-country').value = film.country || ''; 
                    document.getElementById('cinema-duration').value = film.duration || '';
                    document.getElementById('cinema-poster').value = film.poster || '';
                    document.getElementById('cinema-modal-cover').src = film.poster || 'https://placehold.co/400x600/ebe4dc/594636?text=Yok';
                    document.getElementById('cinema-review').innerHTML = film.review || '';
                    document.querySelectorAll('.cinema-delete-btn').forEach(b => b.classList.remove('hidden'));
                    
                    document.getElementById('cinema-cast-list').innerHTML = '';
                    if (film.cast && film.cast.length > 0) {
                        film.cast.forEach(c => this.addCinemaCastRow(c));
                    } else {
                        this.addCinemaCastRow();
                    }
                    
                    this.currentCinemaRating = film.rating || 0;
                    this.renderCinemaRating();
                    
                    AppState.currentCinemaId = film.id;
                }, 50);
            };

            const coverToUse = film.poster ? Utils.escapeHTML(film.poster) : 'https://placehold.co/400x600/ebe4dc/594636?text=Yok';

            card.innerHTML = `
                <div class="relative w-full pt-[150%] shrink-0 overflow-hidden bg-lightHighlight dark:bg-[#1a1a1a] border-b border-lightBorder/50 dark:border-white/5">
                    <img loading="lazy" src="${coverToUse}" onerror="this.src='https://placehold.co/400x600/ebe4dc/594636?text=Yok'; this.onerror=null;" alt="Poster" class="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105">
                </div>
                <div class="flex flex-col ${padding} ${bottomBgClass} w-full relative z-20">
                    <div class="flex justify-between items-start gap-2 w-full">
                        <div class="flex flex-col justify-start min-w-0 flex-1 overflow-hidden">
                            <div class="marquee-container w-full mb-0.5">
                                <h3 class="marquee-text font-bold ${titleColorClass} ${titleSize} leading-tight italic" title="${Utils.escapeHTML(film.title)}">${Utils.escapeHTML(film.title)}</h3>
                            </div>
                            <div class="marquee-container w-full mb-1 flex items-center min-w-0">
                                <span class="marquee-text ${subTextColorClass} ${directorSize} leading-tight" title="${Utils.escapeHTML(film.director || 'Bilinmiyor')}">${Utils.escapeHTML(film.director || 'Bilinmiyor')}</span>
                            </div>
                        </div>
                        <div class="shrink-0 flex flex-col items-center justify-start pt-0.5 ml-1">
                            <div class="flex items-center justify-center rounded-full font-black ${circleSize} ${circleClass} shadow-sm">
                                ${avg > 0 ? avg : '-'}
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-between items-end gap-1 w-full mt-1.5">
                        <span class="${metaSize} font-semibold ${subTextColorClass} truncate text-left" style="max-width: 70%;">${Utils.escapeHTML(film.genre || 'Film')}</span>
                        <div class="flex gap-1 shrink-0 items-center">
                            <span class="${metaSize} font-bold ${genreBgClass} px-1.5 py-0.5 rounded-md text-right">${Utils.escapeHTML(film.year || '-')}</span>
                        </div>
                    </div>
                </div>
            `;
            fragment.appendChild(card);
        });
        
        grid.appendChild(fragment);
    },

    openLiteratureModal() {
        const modal = document.getElementById('literature-modal');
        if(!modal) return;
        
        document.getElementById('literature-title').value = '';
        document.getElementById('literature-author').value = '';
        document.getElementById('literature-year').value = '';
        document.getElementById('literature-publisher').value = '';
        document.getElementById('literature-pages').value = '';
        document.getElementById('literature-genre').value = '';
        document.getElementById('literature-translator').value = ''; // Çevirmen inputunu temizle
        document.getElementById('literature-country').value = ''; // Ülke inputunu temizle
        document.getElementById('literature-translator-container')?.classList.add('hidden'); // Çevirmen kutusunu gizle
        document.getElementById('literature-cover').value = '';
        document.getElementById('literature-modal-cover').src = 'https://placehold.co/400x600/ebe4dc/594636?text=Yok';
        document.getElementById('literature-review').innerHTML = '';
        
        const fileInput = document.getElementById('literature-cover-file');
        if (fileInput) fileInput.value = '';
        
        document.querySelectorAll('.literature-delete-btn').forEach(b => b.classList.add('hidden'));
        
        const covSec = document.getElementById('literature-cover-edit-section');
        if(covSec) covSec.classList.add('hidden');
        
        this.currentLiteratureRating = 0;
        this.renderLiteratureRating();
        AppState.currentLiteratureId = null; 
        
        // ++ KÜNYE KİLİDİ ++
            this.isKünyeLocked = true;
            if (typeof this.applyKünyeLockState === 'function') this.applyKünyeLockState();

        modal.classList.remove('hidden');
        modal.classList.add('flex'); 
        
        requestAnimationFrame(() => {
            requestAnimationFrame(() => { 
                modal.classList.remove('opacity-0'); 
                const content = modal.querySelector('.modal-content');
                if (content) {
                    content.classList.remove('scale-95', 'opacity-0');
                    content.classList.add('scale-100', 'opacity-100');
                }
            });
        });
    },

    closeLiteratureModal() {
        const modal = document.getElementById('literature-modal');
        if(!modal) return;
        const content = modal.querySelector('.modal-content');
        
        modal.classList.add('opacity-0');
        document.getElementById('literature-slider')?.classList.remove('slide-left');
        if (content) {
            content.classList.remove('scale-100', 'opacity-100');
            content.classList.add('scale-95', 'opacity-0');
        }
        
        setTimeout(() => { 
            modal.classList.add('hidden'); 
            modal.classList.remove('flex');
        }, 300);
    },

    renderLiteratureRating() {
        const container = document.getElementById('literature-rating-container');
        if(!container) return;
        container.innerHTML = this.generateStarsHTML(this.currentLiteratureRating, 'setLiteratureRating');
        
        // Rozet içindeki yazıyı güncelle
        const scoreSpan = document.getElementById('modal-literature-avg-score');
        if (scoreSpan) {
            scoreSpan.textContent = this.currentLiteratureRating > 0 ? this.currentLiteratureRating : '-';
        }

        // Rozetin rengini anasayfa kartlarıyla aynı tema kurallarına göre güncelle
        const circleEl = document.getElementById('literature-avg-score-circle');
        if (circleEl) {
            const theme = this.getThemeByRating(this.currentLiteratureRating);
            if (this.currentLiteratureRating > 0) {
                circleEl.className = `flex items-center justify-center rounded-full font-black w-10 h-10 md:w-12 md:h-12 text-sm md:text-base border-2 shadow-sm transition-colors duration-300 ${theme.bottomBgClass} ${theme.titleColorClass} border-white/20 cursor-pointer`;
            } else {
                circleEl.className = `flex items-center justify-center rounded-full font-black w-10 h-10 md:w-12 md:h-12 text-sm md:text-base border-2 shadow-sm transition-colors duration-300 bg-lightBg text-gray-500 border-lightBorder dark:bg-darker dark:text-gray-500 dark:border-gray-800 cursor-pointer`;
            }
        }
    },

    setLiteratureRating(r) {
        this.currentLiteratureRating = this.currentLiteratureRating === r ? 0 : r;
        this.renderLiteratureRating();
    },

    saveLiterature() {
        const title = document.getElementById('literature-title').value.trim();
        const author = document.getElementById('literature-author').value.trim();
        const year = document.getElementById('literature-year').value.trim();
        const publisher = document.getElementById('literature-publisher').value.trim();
        const pages = document.getElementById('literature-pages').value.trim();
        const genre = document.getElementById('literature-genre').value.trim();
        const translator = document.getElementById('literature-translator').value.trim(); // YENİ EKLENDİ
        const country = document.getElementById('literature-country').value.trim(); // Ülke verisini al
        const cover = document.getElementById('literature-cover').value.trim();
        const review = document.getElementById('literature-review').innerHTML.trim();
        
        if(!title) {
            showToast("Kitap adı zorunludur.", "error");
            return;
        }
        
        if (!AppState.literatureLibrary) AppState.literatureLibrary = [];
        
        const isEditing = AppState.currentLiteratureId != null;
        const bookId = isEditing ? AppState.currentLiteratureId : 'literature_' + Date.now();

        const bookData = {
            id: bookId,
            title,
            author,
            year,
            publisher,
            pages,
            genre,
            translator, // YENİ EKLENDİ
            country, // Ülke eklendi
            cover,
            review,
            rating: this.currentLiteratureRating,
            dateAdded: new Date().toISOString()
        };
        
        if (isEditing) {
            const idx = AppState.literatureLibrary.findIndex(f => f.id === bookId);
            if(idx > -1) {
                bookData.dateAdded = AppState.literatureLibrary[idx].dateAdded || bookData.dateAdded;
                AppState.literatureLibrary[idx] = bookData;
            }
        } else {
            AppState.literatureLibrary.unshift(bookData);
        }
        
        this.saveLiteratureData(bookData);
        this.renderLiteratureGrid();
        showToast(`"${title}" başarıyla kaydedildi!`, "success");
        this.closeLiteratureModal();
    },

    deleteLiterature() {
        if (!AppState.currentLiteratureId) return;
        AppState.literatureLibrary = AppState.literatureLibrary.filter(f => f.id !== AppState.currentLiteratureId);
        this.saveToLocal();
        const user = auth.currentUser;
        if (user) {
            const docId = `${user.uid}_${AppState.currentLiteratureId}`;
            deleteDoc(doc(db, 'bir_yonuyle_data', docId)).catch(e => console.error(e));
        }
        this.renderLiteratureGrid();
        showToast("Kitap silindi.", "info");
        this.closeLiteratureModal();
    },

    toggleLiteratureCoverEdit() {
        const sec = document.getElementById('literature-cover-edit-section');
        if(sec) sec.classList.toggle('hidden');
    },

    applyLiteratureCover() {
        const input = document.getElementById('literature-cover');
        const fileInput = document.getElementById('literature-cover-file');
        const img = document.getElementById('literature-modal-cover');
        
        if (fileInput && fileInput.files && fileInput.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const url = e.target.result;
                if(input) input.value = url;
                if(img) img.src = url;
                document.getElementById('literature-cover-edit-section').classList.add('hidden');
            };
            reader.readAsDataURL(fileInput.files[0]);
        } else if (input && img) {
            const url = input.value.trim() || 'https://placehold.co/400x600/ebe4dc/594636?text=Yok';
            img.src = url;
            document.getElementById('literature-cover-edit-section').classList.add('hidden');
        }
    },

    openLiteratureDropdown(event, type) {
        event.stopPropagation();
        const dd = document.getElementById('custom-dropdown');
        if(!dd) return;
        
        if (!dd.classList.contains('hidden') && this.currentDropdownType === `Literature${type}`) {
            this.closeDropdown(); return;
        }

        const btn = event.currentTarget;
        const rect = btn.getBoundingClientRect();
        
        let items = new Set();
        let defLabel = '';
        
        if (type === 'Author') {
            (AppState.literatureLibrary || []).forEach(a => { if(a.author) items.add(a.author); });
            defLabel = 'Tümü (Yazar)';
        } else if (type === 'Genre') {
            (AppState.literatureLibrary || []).forEach(a => { 
                if(a.genre) a.genre.split(',').forEach(g => items.add(g.trim())); 
            });
            defLabel = 'Tümü (Tür)';
        } else if (type === 'Year') {
            (AppState.literatureLibrary || []).forEach(a => { 
                if(a.year) {
                    items.add(a.year); 
                    const decade = Math.floor(parseInt(a.year) / 10) * 10;
                    if (!isNaN(decade)) items.add(`${decade}ler`);
                }
            });
            defLabel = 'Tümü (Yıl)';
        } else if (type === 'Publisher') {
            (AppState.literatureLibrary || []).forEach(a => { if(a.publisher) items.add(a.publisher); });
            defLabel = 'Tümü (Yayınevi)';
        } else if (type === 'Translator') {
            (AppState.literatureLibrary || []).forEach(a => { if(a.translator) items.add(a.translator); });
            defLabel = 'Tümü (Çevirmen)';
        } else if (type === 'Country') {
            (AppState.literatureLibrary || []).forEach(a => { if(a.country) items.add(a.country); });
            defLabel = 'Tümü (Ülke)';
        }

        const currentVal = AppState[`literatureFilter${type}`] || '';
        
        let html = `
            <div onclick="app.setLiteratureFilter('${type}', '')" class="px-5 py-3 hover:bg-lightHighlight dark:hover:bg-surfaceHover cursor-pointer text-sm font-semibold flex justify-between items-center transition-colors border-b border-lightBorder/30 dark:border-gray-800/50 ${currentVal === '' ? 'text-primary' : 'text-gray-700 dark:text-gray-300'}">
                <span>${defLabel}</span>
                ${currentVal === '' ? '<i class="ph-bold ph-check text-lg"></i>' : ''}
            </div>
        `;
        
        let sortedItems = Array.from(items);
        if (type === 'Year') {
            sortedItems.sort((a, b) => {
                const aVal = a.toString().endsWith('ler') ? parseInt(a) + 0.5 : parseInt(a);
                const bVal = b.toString().endsWith('ler') ? parseInt(b) + 0.5 : parseInt(b);
                return bVal - aVal;
            });
        } else {
            sortedItems.sort();
        }

        sortedItems.forEach(item => {
            const isSelected = currentVal === item;
            const isDecade = type === 'Year' && item.toString().endsWith('ler');
            
            html += `
                <div onclick="app.setLiteratureFilter('${type}', '${Utils.escapeHTML(item)}')" class="px-5 py-3 hover:bg-lightHighlight dark:hover:bg-surfaceHover cursor-pointer text-sm ${isDecade ? 'font-bold bg-lightBg/50 dark:bg-surface/50 border-y border-lightBorder/30 dark:border-gray-800/50' : 'font-medium'} flex justify-between items-center transition-colors ${isSelected ? 'text-primary' : 'text-gray-600 dark:text-gray-400'}">
                    <span class="truncate pr-4 ${isDecade ? 'text-gray-800 dark:text-gray-200' : ''}">${Utils.escapeHTML(item)}</span>
                    ${isSelected ? '<i class="ph-bold ph-check text-lg"></i>' : ''}
                </div>
            `;
        });

        dd.innerHTML = html;
        this.currentDropdownType = `Literature${type}`;
        
        dd.classList.remove('hidden');
        
        let top = rect.bottom + 10;
        let left = rect.left;
        const ddWidth = Math.max(200, btn.offsetWidth * 1.5);
        dd.style.minWidth = `${ddWidth}px`;
        if (left + ddWidth > window.innerWidth) left = window.innerWidth - ddWidth - 16;
        if (top + 250 > window.innerHeight) top = rect.top - dd.offsetHeight - 10; 
        dd.style.top = `${top}px`;
        dd.style.left = `${Math.max(16, left)}px`;
        
        requestAnimationFrame(() => dd.classList.remove('opacity-0'));
    },
    
    setLiteratureFilter(type, value) {
        AppState[`literatureFilter${type}`] = value;
        this.closeDropdown();
        this.renderLiteratureGrid();
    },

    toggleLiteratureSort(type) {
        if (AppState.literatureSortBy === type) AppState.literatureSortDirection = AppState.literatureSortDirection === 'desc' ? 'asc' : 'desc';
        else { AppState.literatureSortBy = type; AppState.literatureSortDirection = 'desc'; }
        localStorage.setItem('birYonuyleLiteratureSortBy', AppState.literatureSortBy);
        localStorage.setItem('birYonuyleLiteratureSortDirection', AppState.literatureSortDirection);
        this.updateLiteratureSortClasses(); 
        if (AppState.currentView === 'literature') this.renderLiteratureGrid();
    },

    updateLiteratureSortClasses() {
        ['dateAdded', 'year', 'rating'].forEach(type => {
            const btn = document.getElementById(`btn-literature-sort-${type}`); 
            const iconDir = document.getElementById(`icon-literature-sort-${type}-dir`);
            if (!btn || !iconDir) return;
            if (AppState.literatureSortBy === type) {
                btn.classList.add('text-primary', 'bg-primary/10'); btn.classList.remove('text-gray-500');
                iconDir.className = `ph-bold ph-arrow-${AppState.literatureSortDirection === 'desc' ? 'down' : 'up'} text-[10px]`; iconDir.style.opacity = '1';
            } else {
                btn.classList.remove('text-primary', 'bg-primary/10'); btn.classList.add('text-gray-500');
                iconDir.className = 'ph-bold ph-arrow-down text-[10px]'; iconDir.style.opacity = '0.3';
            }
        });
    },

    renderLiteratureGrid() {
        const grid = document.getElementById('literature-grid');
        const emptyState = document.getElementById('literature-empty-state');
        if(!grid || !emptyState) return;

        const fAuthor = AppState.literatureFilterAuthor;
        const fGenre = AppState.literatureFilterGenre;
        const fYear = AppState.literatureFilterYear;
        const fPublisher = AppState.literatureFilterPublisher;
        const fTranslator = AppState.literatureFilterTranslator;
        const fCountry = AppState.literatureFilterCountry;

        document.getElementById('icon-filter-literature-author')?.classList.toggle('text-primary', !!fAuthor);
        document.getElementById('icon-filter-literature-genre')?.classList.toggle('text-primary', !!fGenre);
        document.getElementById('icon-filter-literature-year')?.classList.toggle('text-primary', !!fYear);
        document.getElementById('icon-filter-literature-publisher')?.classList.toggle('text-primary', !!fPublisher);
        document.getElementById('icon-filter-literature-translator')?.classList.toggle('text-primary', !!fTranslator);
        document.getElementById('icon-filter-literature-country')?.classList.toggle('text-primary', !!fCountry);

        let filtered = (AppState.literatureLibrary || []).filter(a => {
            if (fAuthor && a.author !== fAuthor) return false;
            if (fPublisher && a.publisher !== fPublisher) return false;
            if (fTranslator && a.translator !== fTranslator) return false;
            if (fCountry && a.country !== fCountry) return false;
            if (fYear) {
                if (fYear.endsWith('ler')) {
                    const targetDecade = parseInt(fYear);
                    const bookYear = parseInt(a.year);
                    if (isNaN(bookYear) || bookYear < targetDecade || bookYear >= targetDecade + 10) return false;
                } else if (a.year !== fYear) {
                    return false;
                }
            }
            if (fGenre && (!a.genre || !a.genre.toLowerCase().includes(fGenre.toLowerCase()))) return false;
            return true;
        });

        if (!AppState.literatureSortBy) {
            AppState.literatureSortBy = localStorage.getItem('birYonuyleLiteratureSortBy') || 'dateAdded';
            AppState.literatureSortDirection = localStorage.getItem('birYonuyleLiteratureSortDirection') || 'desc';
            if (typeof this.updateLiteratureSortClasses === 'function') this.updateLiteratureSortClasses();
        }

        filtered.sort((a, b) => {
            const dir = AppState.literatureSortDirection === 'desc' ? 1 : -1;
            if (AppState.literatureSortBy === 'rating') return ((b.rating || 0) - (a.rating || 0)) * dir;
            if (AppState.literatureSortBy === 'year') return ((parseInt(b.year) || 0) - (parseInt(a.year) || 0)) * dir;
            return (new Date(b.dateAdded || 0) - new Date(a.dateAdded || 0)) * dir;
        });
        
        if (!AppState.literatureLibrary || AppState.literatureLibrary.length === 0) {
            grid.innerHTML = '';
            emptyState.classList.remove('hidden');
            emptyState.classList.add('flex');
            return;
        }
        
        emptyState.classList.add('hidden');
        emptyState.classList.remove('flex');
        grid.innerHTML = '';

        if (filtered.length === 0) { 
            grid.innerHTML = `<div class="col-span-full text-center py-10 text-gray-500">Kriterlere uygun kitap bulunamadı.</div>`; 
            return; 
        }
        
        const fragment = document.createDocumentFragment();
        
        const isXSmall = AppState.literatureGridSize === 'xsmall';
        const isSmall = AppState.literatureGridSize === 'small';
        
        const titleSize = isXSmall ? 'text-[8px] sm:text-[10px]' : (isSmall ? 'text-[10px] sm:text-xs' : 'text-xs sm:text-sm');
        const authorSize = isXSmall ? 'text-[7px] sm:text-[9px]' : (isSmall ? 'text-[8.5px] sm:text-[11px]' : 'text-[10px] sm:text-xs');
        const metaSize = isXSmall ? 'text-[5px] sm:text-[8px]' : (isSmall ? 'text-[6px] sm:text-[9px]' : 'text-[7.5px] md:text-[10px]');
        const padding = isXSmall ? 'p-0.5 sm:p-1.5' : (isSmall ? 'p-1 sm:p-2' : 'p-1.5 md:p-3');
        const gapSize = isXSmall ? 'gap-1' : (isSmall ? 'gap-1.5' : 'gap-2 md:gap-3');
        const circleSize = isXSmall ? 'w-5 h-5 sm:w-6 sm:h-6 text-[8px] sm:text-[10px] border' : (isSmall ? 'w-6 h-6 sm:w-8 sm:h-8 text-[10px] sm:text-xs border sm:border-2' : 'w-7 h-7 md:w-10 md:h-10 text-[10px] md:text-sm border md:border-2');

        filtered.forEach(book => {
            const avg = book.rating || 0;
            const hasNotes = book.review && book.review.trim() !== '';

            const { bottomBgClass, borderColorClass, titleColorClass, subTextColorClass, genreBgClass, circleClass } = app.getThemeByRating(avg);

            const card = document.createElement('div');
            card.className = `group flex flex-col rounded-xl overflow-hidden cursor-pointer active:scale-[0.98] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:brightness-105 dark:hover:shadow-[0_10px_20px_rgba(0,0,0,0.5)] shadow-md border ${borderColorClass} mt-auto`;
            
            card.onclick = () => {
                this.openLiteratureModal();
                setTimeout(() => {
                    document.getElementById('literature-title').value = book.title || '';
                    document.getElementById('literature-author').value = book.author || '';
                    document.getElementById('literature-year').value = book.year || '';
                    document.getElementById('literature-publisher').value = book.publisher || '';
                    document.getElementById('literature-pages').value = book.pages || '';
                    document.getElementById('literature-genre').value = book.genre || '';
                    document.getElementById('literature-translator').value = book.translator || '';
                    document.getElementById('literature-country').value = book.country || '';
                    
                    if (book.translator) {
                        document.getElementById('literature-translator-container')?.classList.remove('hidden');
                    } else {
                        document.getElementById('literature-translator-container')?.classList.add('hidden');
                    }
                    
                    document.getElementById('literature-cover').value = book.cover || '';
                    document.getElementById('literature-modal-cover').src = book.cover || 'https://placehold.co/400x600/ebe4dc/594636?text=Yok';
                    document.getElementById('literature-review').innerHTML = book.review || '';
                    document.querySelectorAll('.literature-delete-btn').forEach(b => b.classList.remove('hidden'));
                    this.currentLiteratureRating = book.rating || 0;
                    this.renderLiteratureRating();
                    AppState.currentLiteratureId = book.id;
                }, 50);
            };

            const coverToUse = book.cover ? Utils.escapeHTML(book.cover) : 'https://placehold.co/400x600/ebe4dc/594636?text=Yok';

            card.innerHTML = `
                <div class="relative w-full pt-[150%] shrink-0 overflow-hidden bg-lightHighlight dark:bg-[#1a1a1a] border-b border-lightBorder/50 dark:border-white/5">
                    <img loading="lazy" src="${coverToUse}" onerror="this.src='https://placehold.co/400x400/ebe4dc/594636?text=Yok'; this.onerror=null;" alt="Cover" class="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105">
                </div>
                <div class="flex flex-col ${padding} ${bottomBgClass} w-full relative z-20">
                    <div class="flex justify-between items-start gap-2 w-full">
                        <div class="flex flex-col justify-start min-w-0 flex-1 overflow-hidden">
                            <div class="marquee-container w-full mb-0.5">
                                <h3 class="marquee-text font-bold ${titleColorClass} ${titleSize} leading-tight italic" title="${Utils.escapeHTML(book.title)}">${Utils.escapeHTML(book.title)}</h3>
                            </div>
                            <div class="marquee-container w-full mb-1 flex items-center min-w-0">
                                <span class="marquee-text ${subTextColorClass} ${authorSize} leading-tight" title="${Utils.escapeHTML(book.author || 'Bilinmiyor')}">${Utils.escapeHTML(book.author || 'Bilinmiyor')}</span>
                            </div>
                        </div>
                        <div class="shrink-0 flex flex-col items-center justify-start pt-0.5 ml-1">
                            <div class="flex items-center justify-center rounded-full font-black ${circleSize} ${circleClass} shadow-sm">
                                ${avg > 0 ? avg : '-'}
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-between items-end gap-1 w-full mt-1.5">
                        <span class="${metaSize} font-semibold ${subTextColorClass} truncate text-left" style="max-width: 70%;">${Utils.escapeHTML(book.genre || '-')}</span>
                        <div class="flex gap-1 shrink-0 items-center">
                            <span class="${metaSize} font-bold ${genreBgClass} px-1.5 py-0.5 rounded-md text-right">${Utils.escapeHTML(book.year || '-')}</span>
                        </div>
                    </div>
                </div>
            `;
            fragment.appendChild(card);
        });
        grid.appendChild(fragment);
    },

    
    renderSearchResults(albums, fallbackArtist = null) {
        const con = document.getElementById('search-results'); 
        if(!con) return;
        con.innerHTML = '';
        const frag = document.createDocumentFragment();
        const noCoverText = t('no_cover').replace(/ /g, '+');

        albums.forEach(al => {
            const mbid = al.id, title = Utils.escapeHTML(al.title), artist = Utils.escapeHTML(al['artist-credit']?.[0]?.name || fallbackArtist || t('unknown'));
            const year = Utils.escapeHTML(al['first-release-date'] ? al['first-release-date'].substring(0, 4) : t('unknown'));
            const coverUrl = `https://coverartarchive.org/release-group/${mbid}/front-250`;
            const inLib = AppState.library.some(a => a.id === mbid);

            const card = document.createElement('div');
            card.className = `bg-white dark:bg-surface p-2.5 rounded-xl border ${inLib ? 'border-primary' : 'border-lightBorder dark:border-gray-800'} flex gap-3 active:scale-[0.98] transition-transform shadow-sm cursor-pointer hover:bg-lightHighlight dark:hover:bg-surfaceHover`;
            card.onclick = () => this.openAlbumModal(mbid, al.title, al['artist-credit']?.[0]?.name || fallbackArtist, year, coverUrl); 

            card.innerHTML = `
                <img loading="lazy" src="${coverUrl}" onerror="this.src='https://placehold.co/150x150/ebe4dc/594636?text=${noCoverText}'; this.onerror=null;" class="w-20 h-20 bg-lightHighlight rounded-lg object-cover flex-shrink-0">
                <div class="flex flex-col justify-center overflow-hidden flex-grow">
                    <h4 class="font-bold text-gray-900 dark:text-white truncate text-sm md:text-base italic">${title}</h4>
                    <p class="text-xs text-gray-500 truncate mb-1">${artist}</p>
                    <div class="flex gap-1.5 mt-1">
                        <span class="text-[10px] bg-lightBg dark:bg-darker px-2 py-0.5 rounded text-gray-600 font-bold">${year}</span>
                        <span class="text-[10px] bg-lightHighlight dark:bg-gray-800 px-2 py-0.5 rounded text-gray-600 dark:text-gray-300 font-bold">${al['primary-type'] === 'EP' ? 'EP' : t('studio_album')}</span>
                        ${inLib ? `<span class="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded font-bold flex items-center gap-1"><i class="ph-fill ph-check-circle"></i> ${t("added_to_lib")}</span>` : ''}
                    </div>
                </div>`;
            frag.appendChild(card);
        });
        con.appendChild(frag);
    },

    openEmptyAlbumModal() {
        const fileInput = document.getElementById('custom-cover-file');
        if (fileInput) fileInput.value = '';
        const modal = document.getElementById('album-modal');
        const tl = document.getElementById('modal-tracklist');
        if(!modal || !tl) return;

        this.isEditMode = true; 
        document.getElementById('cover-edit-section')?.classList.add('hidden');
        document.getElementById('edit-mode-btn')?.classList.add('bg-primary/20', 'text-primary');
        document.getElementById('auto-fetch-genre-btn')?.classList.remove('hidden');
        
        modal.classList.remove('hidden');
        modal.classList.add('flex'); 
        
        requestAnimationFrame(() => {
            requestAnimationFrame(() => { 
                modal.classList.remove('opacity-0'); 
                const content = modal.querySelector('.modal-content');
                if (content) {
                    content.classList.remove('scale-95', 'opacity-0');
                    content.classList.add('scale-100', 'opacity-100');
                }
            });
        });
        
        tl.innerHTML = '';
        
        const emptyAlbum = { 
            id: 'manual_' + Date.now(), 
            title: 'Albüm Adı', 
            artist: 'Sanatçı Adı', 
            year: new Date().getFullYear().toString(), 
            label: t("independent"), 
            country: 'TR', 
            coverUrl: 'https://placehold.co/400x400/ebe4dc/594636?text=' + t('no_cover').replace(/ /g, '+'), 
            tracks: [], 
            genres: [], 
            dateAdded: new Date().toISOString(), 
            averageScore: 0 
        };
        
        AppState.currentModalAlbum = emptyAlbum; 
        this.updateModalUI();

        ['modal-title', 'modal-artist', 'modal-date', 'modal-label', 'modal-country'].forEach(id => {
            const el = document.getElementById(id); 
            if(el) {
                el.contentEditable = true;
                el.classList.add('border-b', 'border-dashed', 'border-primary', 'bg-lightHighlight', 'dark:bg-darker');
            }
        });
        
        const artistEl = document.getElementById('modal-artist');
        if (artistEl) {
            artistEl.classList.remove('cursor-pointer', 'hover:underline', 'hover:text-primary');
            artistEl.onclick = null;
        }
        
        this.renderTracklist();
    },

    openEmptyAlbumModal() {
        const modal = document.getElementById('album-modal');
        if(!modal) return;
        
        document.getElementById('album-title').value = '';
        document.getElementById('album-artist').value = '';
        document.getElementById('album-year').value = new Date().getFullYear().toString();
        document.getElementById('album-label').value = '';
        document.getElementById('album-country').value = '';
        document.getElementById('album-genre').value = '';
        document.getElementById('custom-cover-url').value = '';
        document.getElementById('modal-cover').src = 'https://placehold.co/400x400/ebe4dc/594636?text=Yok';
        document.getElementById('album-review').innerHTML = '';
        
        document.querySelectorAll('.album-delete-btn').forEach(b => b.classList.add('hidden'));
        document.getElementById('cover-edit-section').classList.add('hidden');
        
        const emptyAlbum = { 
            id: 'manual_' + Date.now(), 
            title: '', 
            artist: '', 
            year: new Date().getFullYear().toString(), 
            label: '', 
            country: '', 
            coverUrl: 'https://placehold.co/400x400/ebe4dc/594636?text=Yok', 
            tracks: [], 
            genres: [], 
            dateAdded: new Date().toISOString(), 
            averageScore: 0,
            note: ''
        };
        
        AppState.currentModalAlbum = emptyAlbum; 
        
        modal.classList.remove('hidden');
        modal.classList.add('flex'); 
        
        requestAnimationFrame(() => {
            requestAnimationFrame(() => { 
                modal.classList.remove('opacity-0'); 
                const content = modal.querySelector('.modal-content');
                if (content) {
                    content.classList.remove('scale-95', 'opacity-0');
                    content.classList.add('scale-100', 'opacity-100');
                }
            });
        });
        
        this.renderTracklist();
        this.calculateAverageScore();
    },

    async openAlbumModal(mbid, title, artist, year, defCover = null) {
        const fileInput = document.getElementById('custom-cover-file');
        if (fileInput) fileInput.value = '';
        const modal = document.getElementById('album-modal');
        const tl = document.getElementById('modal-tracklist');
        if(!modal || !tl) return;

        document.getElementById('cover-edit-section')?.classList.add('hidden');
        
        modal.classList.remove('hidden');
        modal.classList.add('flex'); 
        
        requestAnimationFrame(() => {
            requestAnimationFrame(() => { 
                modal.classList.remove('opacity-0'); 
                const content = modal.querySelector('.modal-content');
                if (content) {
                    content.classList.remove('scale-95', 'opacity-0');
                    content.classList.add('scale-100', 'opacity-100');
                }
            });
        });
        
        tl.innerHTML = `<div class="flex justify-center p-8"><i class="ph-bold ph-spinner-gap animate-spin text-xl text-primary"></i></div>`;
        
        let albumData = AppState.library.find(a => a.id === mbid);
        if (!albumData) {
            try {
                const res = await fetch(`https://musicbrainz.org/ws/2/release/?release-group=${mbid}&inc=recordings+labels+genres&fmt=json&limit=1`);
                const data = await res.json();
                let tracks = [], label = t("independent"), country = "", rDate = year, genres = [];
                if (data.releases && data.releases.length > 0) {
                    const rel = data.releases[0];
                    if(rel.date) rDate = rel.date; 
                    if(rel['label-info']?.length > 0) label = rel['label-info'][0].label?.name || t("independent");
                    if(rel.country) country = rel.country;
                    if(rel.genres?.length > 0) genres = rel.genres.sort((a,b)=>b.count-a.count).slice(0,3).map(g=>g.name.charAt(0).toUpperCase()+g.name.slice(1));
                    if(rel.media?.length > 0) {
                        let c = 1; tracks = rel.media.reduce((acc, m) => acc.concat(m.tracks.map(t => ({id:t.id, title:t.recording.title, number:(c++).toString(), rating:0}))), []);
                    }
                } else tracks = [{id:'1', title:t("no_tracks"), number:'1', rating:0}];
                
                albumData = { id: mbid, title: title||t('unknown'), artist: artist||t('unknown'), year: rDate.substring(0,4), label: label, country: country, coverUrl: defCover || `https://coverartarchive.org/release-group/${mbid}/front-500`, tracks: tracks, genres: genres, dateAdded: new Date().toISOString(), averageScore: 0, note: '' };
            } catch(e) { tl.innerHTML = `<div class="text-red-500 text-center text-xs p-4">${t('error_loading')}</div>`; return; }
        }
        AppState.currentModalAlbum = JSON.parse(JSON.stringify(albumData)); 
        this.updateModalUI();
    },

    closeModal() {
        const modal = document.getElementById('album-modal');
        if(!modal) return;
        const content = modal.querySelector('.modal-content');
        
        modal.classList.add('opacity-0');
        document.getElementById('album-slider')?.classList.remove('slide-left');
        if (content) {
            content.classList.remove('scale-100', 'opacity-100');
            content.classList.add('scale-95', 'opacity-0');
        }
        
        setTimeout(() => { 
            modal.classList.add('hidden'); 
            modal.classList.remove('flex');
            AppState.currentModalAlbum = null; 
        }, 300);
    },

    updateModalUI() {
        const al = AppState.currentModalAlbum;
        if(!al) return;
        
        document.getElementById('album-title').value = al.title || '';
        document.getElementById('album-artist').value = al.artist || '';
        document.getElementById('album-year').value = al.year || '';
        document.getElementById('album-label').value = al.label || '';
        document.getElementById('album-country').value = al.country || '';
        document.getElementById('album-genre').value = (al.genres && al.genres.length > 0) ? al.genres.join(', ') : '';
        
        document.getElementById('album-review').innerHTML = al.note || '';
        
        const cov = document.getElementById('modal-cover'); 
        if(cov) cov.src = al.customCoverUrl || al.coverUrl;
        
        const inLibrary = AppState.library.some(a => a.id === al.id);
        document.querySelectorAll('.album-delete-btn').forEach(b => {
            if (inLibrary) b.classList.remove('hidden');
            else b.classList.add('hidden');
        });

        // Künye kilit durumunu başlat (Varsayılan olarak kilitli)
        this.isKünyeLocked = true;
        if (typeof this.applyKünyeLockState === 'function') {
            this.applyKünyeLockState();
        }

        this.renderTracklist(); 
        this.calculateAverageScore();
    },

    handleCountryInput(val) {
        const code = val.trim().toLowerCase();
        this.updateCountryIcon(code);
    },

    updateCountryIcon(code) {
        const container = document.getElementById('modal-country-icon-container');
        if (!container) return;
        
        if (code.length === 2 && /^[a-z]{2}$/.test(code)) {
            container.innerHTML = `<img src="https://flagcdn.com/24x18/${code}.png" alt="${code.toUpperCase()}" class="w-5 h-auto rounded-sm shadow-sm object-cover" onerror="this.onerror=null; this.outerHTML='<i class=\\'ph-bold ph-globe text-lg text-gray-400\\'></i>'">`;
        } else {
            container.innerHTML = `<i class="ph-bold ph-globe text-lg text-gray-400"></i>`;
        }
    },

    renderDateAdded() {
        const al = AppState.currentModalAlbum;
        if (!al) return;
        const d = new Date(al.dateAdded);
        const isValid = !isNaN(d.getTime());
        const formattedDate = isValid ? d.toLocaleDateString(AppState.language === 'en' ? 'en-US' : 'tr-TR') : '-';
        const isoDate = isValid ? d.toISOString().split('T')[0] : '';

        const dateAddedContainer = document.getElementById('modal-date-added-container');
        if (dateAddedContainer) {
            if (this.isEditMode) {
                dateAddedContainer.innerHTML = `
                    <div class="relative flex items-center gap-1.5 cursor-pointer bg-lightHighlight dark:bg-darker border border-dashed border-primary px-1.5 py-0.5 rounded active:scale-95 transition-transform w-fit" onclick="document.getElementById('added-date-picker').showPicker()">
                        <span class="text-[10px] font-bold text-gray-800 dark:text-gray-200">${formattedDate}</span>
                        <i class="ph-bold ph-arrows-clockwise text-primary text-xs"></i>
                        <input type="date" id="added-date-picker" value="${isoDate}" class="absolute opacity-0 pointer-events-none w-0 h-0" onchange="app.updateAddedDate(this.value); event.stopPropagation();">
                    </div>
                `;
            } else {
                dateAddedContainer.innerHTML = `<p id="modal-date-added" class="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate">${formattedDate}</p>`;
            }
        }
    },

    updateAddedDate(val) {
        if (AppState.currentModalAlbum && val) {
            const newDate = new Date(val);
            if (!isNaN(newDate.getTime())) {
                AppState.currentModalAlbum.dateAdded = newDate.toISOString();
                this.updateModalUI();
            }
        }
    },

    updateTrackField(idx, fld, val) { 
        if(AppState.currentModalAlbum && AppState.currentModalAlbum.tracks[idx]) { 
            AppState.currentModalAlbum.tracks[idx][fld] = val.trim(); 
        } 
    },
    
    toggleCoverEdit() { 
        const sec = document.getElementById('cover-edit-section');
        if(sec) sec.classList.toggle('hidden'); 
    },
    
    applyCustomCover() { 
        const input = document.getElementById('custom-cover-url');
        const fileInput = document.getElementById('custom-cover-file');
        const img = document.getElementById('modal-cover');
        const sec = document.getElementById('cover-edit-section');
        
        // Önce dosya seçilmiş mi kontrol et
        if (fileInput && fileInput.files && fileInput.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const url = e.target.result;
                if(input) input.value = url;
                if(img) img.src = url;
                if(AppState.currentModalAlbum) AppState.currentModalAlbum.customCoverUrl = url;
                if(sec) sec.classList.add('hidden');
            };
            reader.readAsDataURL(fileInput.files[0]);
        } 
        // Dosya yoksa URL kısmına bak
        else if (input && img) {
            const url = input.value.trim();
            if (url && AppState.currentModalAlbum) {
                AppState.currentModalAlbum.customCoverUrl = url;
                img.src = url;
                if(sec) sec.classList.add('hidden');
            }
        }
    },
    
    async searchiTunesCover() {
        const al = AppState.currentModalAlbum, btn = document.getElementById('itunes-search-btn'); 
        if(!al || !btn) return;
        const oH = btn.innerHTML; btn.innerHTML = `<i class="ph-bold ph-spinner animate-spin"></i>`;
        try {
            const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(al.artist+' '+al.title)}&entity=album&limit=1`);
            const data = await res.json();
            if(data.results?.length > 0) { 
                AppState.currentModalAlbum.customCoverUrl = data.results[0].artworkUrl100.replace('100x100bb','600x600bb'); 
                this.updateModalUI(); 
                document.getElementById('cover-edit-section')?.classList.add('hidden'); 
                showToast(t("toast_cover_found"), "success"); 
            } else {
                showToast(t("toast_cover_not_found"), "error");
            }
        } catch(e) { showToast(t("toast_search_error"), "error"); } finally { btn.innerHTML = oH; }
    },

    renderGenres() {
        const con = document.getElementById('modal-genres'); 
        if(!con) return;
        con.innerHTML = '';
        const al = AppState.currentModalAlbum; 
        if(!al) return;
        if(!al.genres) al.genres = [];
        
        al.genres.forEach((g, i) => {
            const displayG = tGenre(g);
            const tag = document.createElement('span');
            tag.className = `px-2 py-1 bg-lightBorder dark:bg-darker rounded-lg text-[10px] font-bold flex items-center gap-1 ${!this.isEditMode ? 'active:scale-95 cursor-pointer hover:bg-primary/20 hover:text-primary transition-colors' : 'cursor-grab active:cursor-grabbing'}`;
            if(!this.isEditMode) { 
                tag.innerHTML = Utils.escapeHTML(displayG); 
                tag.onclick = (e) => { e.stopPropagation(); this.filterByGenre(g); }; 
            }
            else { 
                tag.innerHTML = `<i class="ph-bold ph-dots-six-vertical text-gray-400 mr-0.5"></i> ${Utils.escapeHTML(displayG)} <i class="ph-bold ph-x ml-1 cursor-pointer hover:text-red-500 p-0.5" onclick="app.removeGenre(${i})"></i>`; 
                
                tag.draggable = true;
                tag.dataset.index = i;
                tag.ondragstart = (e) => { app.draggedGenreIndex = i; e.dataTransfer.effectAllowed = 'move'; setTimeout(() => tag.classList.add('opacity-50'), 0); };
                tag.ondragend = (e) => { tag.classList.remove('opacity-50'); app.draggedGenreIndex = null; };
                tag.ondragover = (e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; };
                tag.ondragenter = (e) => { e.preventDefault(); tag.classList.add('scale-105', 'bg-primary/20'); };
                tag.ondragleave = (e) => { tag.classList.remove('scale-105', 'bg-primary/20'); };
                tag.ondrop = (e) => {
                    e.preventDefault();
                    tag.classList.remove('scale-105', 'bg-primary/20');
                    if (app.draggedGenreIndex !== null && app.draggedGenreIndex !== i) {
                        const draggedItem = AppState.currentModalAlbum.genres.splice(app.draggedGenreIndex, 1)[0];
                        AppState.currentModalAlbum.genres.splice(i, 0, draggedItem);
                        app.renderGenres();
                        app.updateModalButtons();
                    }
                };
            }
            con.appendChild(tag);
        });
        if(this.isEditMode && al.genres.length < 3) {
            const add = document.createElement('button'); add.className = 'px-2 py-1 bg-primary/20 text-primary rounded-lg text-[10px] font-bold flex items-center hover:bg-primary/30 transition-colors cursor-pointer';
            add.innerHTML = `<i class="ph-bold ph-plus"></i>`; add.onclick = () => this.promptAddGenre(); con.appendChild(add);
        }
    },
    
    async autoFetchGenres(fromModal = false) { 
        const al = AppState.currentModalAlbum;
        if (!al) return;
        
        const btn = document.getElementById('auto-fetch-genre-btn');
        const originalIcon = btn ? btn.innerHTML : '';
        if (btn) btn.innerHTML = `<i class="ph-bold ph-spinner animate-spin"></i>`;
        
        try {
            let foundGenres = [];
            const title = document.getElementById('album-title').value;
            const artist = document.getElementById('album-artist').value;

            const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(artist + ' ' + title)}&entity=album&limit=1`);
            const data = await res.json();
            
            if (data.results?.length > 0 && data.results[0].primaryGenreName) {
                foundGenres.push(data.results[0].primaryGenreName);
            }

            if (foundGenres.length > 0) {
                let currentGenres = document.getElementById('album-genre').value.split(',').map(g=>g.trim()).filter(g=>g);
                let added = 0;
                
                foundGenres.forEach(g => {
                    const formatted = g.charAt(0).toUpperCase() + g.slice(1);
                    if (!currentGenres.includes(formatted) && currentGenres.length < 3) {
                        currentGenres.push(formatted);
                        added++;
                    }
                });

                if (added > 0) {
                    document.getElementById('album-genre').value = currentGenres.join(', ');
                    showToast(`${added} ${t("toast_auto_genre_success")}`, "success");
                } else {
                    showToast(t("toast_auto_genre_info"), "info");
                }
            } else {
                showToast(t("toast_auto_genre_fail"), "error");
            }
        } catch(e) { 
            showToast(t("toast_search_error"), "error"); 
        } finally {
            if (btn) btn.innerHTML = originalIcon;
        }
    },
    
    promptAddGenre() {
        const inp = document.getElementById('custom-genre-input');
        if(inp) inp.value = '';
        const mod = document.getElementById('genre-selection-modal');
        if(mod) {
            mod.classList.remove('hidden');
            mod.classList.add('flex');
            setTimeout(() => inp?.focus(), 100);
        }
    },
    
    confirmAddGenre() {
        const inp = document.getElementById('custom-genre-input');
        if(!inp) return;
        const input = inp.value.trim();
        if(!input || !AppState.currentModalAlbum) return;
        
        let newGenres = input.split(',').map(g => g.trim()).filter(g => g !== '');
        if(!AppState.currentModalAlbum.genres) AppState.currentModalAlbum.genres = [];
        
        for(let g of newGenres) {
            let formatted = g.charAt(0).toUpperCase() + g.slice(1);
            if(!AppState.currentModalAlbum.genres.includes(formatted) && AppState.currentModalAlbum.genres.length < 3) {
                AppState.currentModalAlbum.genres.push(formatted);
            }
        }
        
        this.renderGenres(); 
        this.updateModalButtons(); 
        this.closeGenreModal();
    },

    closeGenreModal() { 
        const mod = document.getElementById('genre-selection-modal');
        if(mod) { mod.classList.add('hidden'); mod.classList.remove('flex'); }
    },
    
    removeGenre(i) { 
        if(AppState.currentModalAlbum?.genres) {
            AppState.currentModalAlbum.genres.splice(i, 1); 
            this.renderGenres(); 
            this.updateModalButtons(); 
        }
    },
    
    filterByGenre(g) {
        this.closeModal(); this.showView('library');
        this.setFilter('Genre', g);
        window.scrollTo(0,0);
    },

    openNotePanel(type, index = null) {
        this.currentNoteTarget = { type, index };
        const modal = document.getElementById('note-modal');
        const textarea = document.getElementById('note-textarea');
        const display = document.getElementById('note-display');
        const titleSpan = document.querySelector('#note-modal-title span');
        const subtitle = document.getElementById('note-modal-subtitle');
        
        if(!modal || !textarea || !AppState.currentModalAlbum) return;
        
        let currentText = '';
        let titleKey = 'note';
        let subText = '';
        
        if (type === 'album') {
            currentText = AppState.currentModalAlbum.note || '';
            titleKey = 'album_note';
            subText = `${AppState.currentModalAlbum.artist} • ${AppState.currentModalAlbum.title}`;
        } else if (type === 'track' && index !== null) {
            const track = AppState.currentModalAlbum.tracks.find(t => t.originalIndex === index) || AppState.currentModalAlbum.tracks[index];
            currentText = track.note || '';
            titleKey = 'track_note';
            subText = `${track.number}. ${track.title}`;
        }
        
        textarea.value = currentText;
        if(display) display.textContent = currentText;
        
        if(titleSpan) titleSpan.textContent = t(titleKey);
        if(subtitle) subtitle.textContent = subText;
        
        if (!currentText || currentText.trim() === '') {
            this.setNoteEditMode(true);
            textarea.value = '• ';
        } else {
            this.setNoteEditMode(false);
        }
        
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        requestAnimationFrame(() => {
            modal.classList.remove('opacity-0');
            modal.querySelector('div').classList.remove('scale-95');
            if (this.isNoteEditMode) textarea.focus();
        });
    },

    setNoteEditMode(isEdit) {
        this.isNoteEditMode = isEdit;
        const display = document.getElementById('note-display');
        const textarea = document.getElementById('note-textarea');
        const footer = document.getElementById('note-modal-footer');
        const editBtn = document.getElementById('note-edit-btn');

        if (!display || !textarea || !footer || !editBtn) return;

        if (isEdit) {
            display.classList.add('hidden');
            textarea.classList.remove('hidden');
            footer.classList.remove('hidden');
            footer.classList.add('flex');
            editBtn.classList.add('bg-primary/20', 'text-primary');
            textarea.focus();
            textarea.setSelectionRange(textarea.value.length, textarea.value.length);
        } else {
            display.classList.remove('hidden');
            textarea.classList.add('hidden');
            footer.classList.add('hidden');
            footer.classList.remove('flex');
            editBtn.classList.remove('bg-primary/20', 'text-primary');
        }
    },

    toggleNoteEditMode() {
        if (this.isNoteEditMode) {
            this.saveNote(false); 
        } else {
            this.setNoteEditMode(true);
            const textarea = document.getElementById('note-textarea');
            if (textarea && textarea.value.trim() === '') {
                textarea.value = '• ';
            }
        }
    },

    handleNoteKeydown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const ta = e.target;
            const start = ta.selectionStart;
            const end = ta.selectionEnd;
            const val = ta.value;
            ta.value = val.substring(0, start) + '\n• ' + val.substring(end);
            ta.selectionStart = ta.selectionEnd = start + 3;
        }
    },

    closeNotePanel() {
        const modal = document.getElementById('note-modal');
        if(!modal) return;
        modal.classList.add('opacity-0');
        modal.querySelector('div').classList.add('scale-95');
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            this.currentNoteTarget = null;
        }, 200);
    },

    saveNote(close = true) {
        if(!this.currentNoteTarget || !AppState.currentModalAlbum) return;
        const textarea = document.getElementById('note-textarea');
        const display = document.getElementById('note-display');
        
        let rawText = textarea.value;
        let lines = rawText.split('\n');
        let bulleted = lines.map(line => {
            let t = line.trim();
            if (t === '' || t === '•') return null;
            if (!t.startsWith('•')) return '• ' + t;
            return line;
        }).filter(l => l !== null);
        let text = bulleted.join('\n');
        
        const { type, index } = this.currentNoteTarget;
        
        if (type === 'album') {
            AppState.currentModalAlbum.note = text;
            this.updateAlbumNoteIcon();
        } else if (type === 'track' && index !== null) {
            const actualTrackIndex = AppState.currentModalAlbum.tracks.findIndex(t => t.originalIndex === index || t === AppState.currentModalAlbum.tracks[index]);
            if (actualTrackIndex !== -1) {
                AppState.currentModalAlbum.tracks[actualTrackIndex].note = text;
            }
        }
        
        this.updateModalButtons();
        if (type === 'track') this.renderTracklist();
        
        textarea.value = text;
        if(display) display.textContent = text;
        
        const isSaved = AppState.library.some(a => a.id === AppState.currentModalAlbum.id);
        if (isSaved) {
            const libIdx = AppState.library.findIndex(a => a.id === AppState.currentModalAlbum.id);
            if (libIdx > -1) {
                AppState.library[libIdx] = JSON.parse(JSON.stringify(AppState.currentModalAlbum));
                this.saveAlbumData(AppState.library[libIdx]);
            }
        }

        if (close) {
            this.closeNotePanel();
        } else {
            this.setNoteEditMode(false);
        }
    },
    
    showAllNotes(albumId) {
        const album = AppState.library.find(a => a.id === albumId);
        if (!album) return;

        let html = '';
        let rawTextForCopy = '';

        html += `<div class="flex items-center gap-4 mb-5 pb-4 border-b border-lightBorder dark:border-gray-800">
            <img src="${Utils.escapeHTML(album.customCoverUrl || album.coverUrl)}" onerror="this.src='https://placehold.co/100x100/ebe4dc/594636?text=${t('no_cover').replace(/ /g, '+')}'; this.onerror=null;" class="w-16 h-16 rounded-xl shadow-md object-cover border border-lightBorder dark:border-gray-800 flex-shrink-0">
            <div class="min-w-0">
                <h2 class="text-xl md:text-2xl font-black text-gray-900 dark:text-white italic leading-tight truncate">${Utils.escapeHTML(album.title)}</h2>
                <p class="text-sm md:text-base font-semibold text-gray-500 dark:text-gray-400 truncate mt-0.5">${Utils.escapeHTML(album.artist)}</p>
            </div>
        </div>`;

        rawTextForCopy += `${album.artist.toUpperCase()} - ${album.title.toUpperCase()}\n`;
        rawTextForCopy += `=========================================\n\n`;

        if (album.note && album.note.trim() !== '') {
            html += `<div class="mb-6">
                <div class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-xs font-bold mb-3 uppercase tracking-widest shadow-sm">
                    <i class="ph-bold ph-vinyl-record text-base"></i> ${t("album_note")}
                </div>
                <div class="bg-lightBg dark:bg-darker rounded-xl p-5 border border-lightBorder dark:border-gray-800 text-base italic leading-relaxed text-gray-800 dark:text-gray-200 whitespace-pre-wrap shadow-inner font-medium">${Utils.escapeHTML(album.note)}</div>
            </div>`;
            
            rawTextForCopy += `[${t("album_note").toUpperCase()}]\n${album.note.trim()}\n\n`;
        }

        const tracksWithNotes = album.tracks ? album.tracks.filter(t => t.note && t.note.trim() !== '') : [];
        if (tracksWithNotes.length > 0) {
            html += `<div class="space-y-4">
                <div class="flex items-center gap-2 mb-3 pb-2 border-b border-lightBorder/50 dark:border-gray-800/50">
                    <i class="ph-bold ph-music-notes text-gray-400 text-lg"></i>
                    <h3 class="text-sm font-bold text-gray-500 uppercase tracking-widest">${t("track_notes")}</h3>
                </div>`;
            
            rawTextForCopy += `[${t("track_notes").toUpperCase()}]\n`;

            tracksWithNotes.forEach(track => {
                html += `<div class="bg-white dark:bg-surfaceHover rounded-xl p-4 border border-lightBorder dark:border-gray-800 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                    <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-primary/40 group-hover:bg-primary transition-colors"></div>
                    <h4 class="font-bold text-gray-900 dark:text-white mb-2 flex items-start gap-2 pl-2">
                        <span class="text-sm text-primary font-black mt-0.5">${track.number}.</span>
                        <span class="italic text-lg leading-snug">${Utils.escapeHTML(track.title)}</span>
                    </h4>
                    <div class="text-base italic leading-relaxed text-gray-600 dark:text-gray-300 whitespace-pre-wrap pl-6 ml-0.5 border-l-2 border-lightBorder/60 dark:border-gray-700/60">${Utils.escapeHTML(track.note)}</div>
                </div>`;

                rawTextForCopy += `${track.number}. ${track.title.toUpperCase()}:\n${track.note.trim()}\n\n`;
            });
            html += `</div>`;
        }

        AppState.currentAllNotesRawText = rawTextForCopy.trim();

        const contentEl = document.getElementById('all-notes-content');
        if (contentEl) {
            contentEl.innerHTML = html;
        }

        const modal = document.getElementById('all-notes-modal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            requestAnimationFrame(() => {
                modal.classList.remove('opacity-0');
                modal.querySelector('div').classList.remove('scale-95');
            });
        }
    },

    closeAllNotesModal() {
        const modal = document.getElementById('all-notes-modal');
        if (!modal) return;
        modal.classList.add('opacity-0');
        modal.querySelector('div').classList.add('scale-95');
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }, 200);
    },

    copyAllNotes() {
        if (!AppState.currentAllNotesRawText) return;
        const text = AppState.currentAllNotesRawText;
        
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                showToast(t("toast_notes_copied"), "success");
            }).catch(() => this.fallbackCopyText(text));
        } else {
            this.fallbackCopyText(text);
        }
    },

    fallbackCopyText(text) {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        try {
            document.execCommand('copy');
            showToast(t("toast_notes_copied"), "success");
        } catch(err) {
            showToast(t("toast_copy_fail"), "error");
        }
        document.body.removeChild(ta);
    },

    toggleModalTrackSort(mode) {
        AppState.modalTrackSort = mode;
        localStorage.setItem('birYonuyleModalTrackSort', mode);
        this.updateModalTrackSortButtons();
        this.renderTracklist();
    },

    toggleModalTrackSort(mode) {
        AppState.modalTrackSort = mode;
        localStorage.setItem('birYonuyleModalTrackSort', mode);
        this.updateModalTrackSortButtons();
        this.renderTracklist();
    },

    updateModalTrackSortButtons() {
        const mode = AppState.modalTrackSort;
        const btnDef = document.getElementById('btn-track-sort-default');
        const btnRat = document.getElementById('btn-track-sort-rating');
        if (btnDef && btnRat) {
            if (mode === 'default') {
                btnDef.className = "px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full font-semibold text-primary bg-white dark:bg-surfaceHover shadow-sm";
                btnRat.className = "px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full font-semibold text-gray-500 dark:text-gray-400 hover:text-primary";
            } else {
                btnDef.className = "px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full font-semibold text-gray-500 dark:text-gray-400 hover:text-primary";
                btnRat.className = "px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full font-semibold text-primary bg-white dark:bg-surfaceHover shadow-sm";
            }
        }
    },

    renderTracklist() {
        const con = document.getElementById('modal-tracklist'), al = AppState.currentModalAlbum;
        if(!con || !al) return;
        
        if (!al.tracks || al.tracks.length === 0) { con.innerHTML = `<p class="text-[10px] text-gray-500 p-2 text-center">${t('no_tracks')}</p>`; return; }
        con.innerHTML = ''; 
        const frag = document.createDocumentFragment();

        let tracksWithIndex = al.tracks.map((tr, idx) => ({ ...tr, originalIndex: idx }));

        if (AppState.modalTrackSort === 'rating') {
            tracksWithIndex.sort((a, b) => {
                if (b.rating !== a.rating) {
                    return b.rating - a.rating;
                }
                return parseInt(a.number || 0) - parseInt(b.number || 0);
            });
        }

        tracksWithIndex.forEach((tr) => {
            const i = tr.originalIndex;
            const row = document.createElement('div');
            row.className = 'flex items-center gap-1 w-full bg-lightBg dark:bg-surfaceHover border border-lightBorder/50 dark:border-gray-800 rounded-md px-1.5 py-0.5 shadow-sm';

            let stars = this.generateTrackStarsHTML(tr.rating, i);

            row.innerHTML = `
                <input type="text" value="${Utils.escapeHTML(tr.number)}" onblur="app.updateTrackField(${i},'number',this.value)" class="w-4 text-[9px] text-center font-bold bg-transparent outline-none text-gray-500 dark:text-gray-400">
                <input type="text" value="${Utils.escapeHTML(tr.title)}" onblur="app.updateTrackField(${i},'title',this.value)" class="flex-grow text-[9px] sm:text-[10px] font-bold bg-transparent min-w-0 outline-none text-gray-800 dark:text-gray-200 italic">
                ${stars}
                <button onclick="app.openNotePanel('track', ${i})" class="p-0.5 rounded flex-shrink-0 transition-colors ${tr.note ? 'text-primary bg-primary/10' : 'text-gray-400 hover:text-gray-600'}"><i class="ph-${tr.note ? 'fill' : 'bold'} ph-paperclip text-[10px]"></i></button>
                <button onclick="app.deleteTrack(${i})" class="text-gray-400 hover:text-red-500 rounded p-0.5 flex-shrink-0 transition-colors"><i class="ph-bold ph-trash text-[10px]"></i></button>
            `;
            frag.appendChild(row);
        });
        
        con.appendChild(frag);
        this.updateModalTrackSortButtons();
    },

    rateTrack(idx, r) { 
        if(!AppState.currentModalAlbum?.tracks?.[idx]) return;
        AppState.currentModalAlbum.tracks[idx].rating = AppState.currentModalAlbum.tracks[idx].rating === r ? 0 : r; 
        this.renderTracklist(); 
        this.calculateAverageScore(); 
    },
    
    calculateAverageScore() {
        const al = AppState.currentModalAlbum;
        if(!al) return;
        
        const totalTracks = al.tracks ? al.tracks.length : 0;
        const ratedTracks = al.tracks ? al.tracks.filter(t => t.rating > 0) : [];
        
        let runningAvg = "0.0";
        let finalAvg = 0;
        
        if (ratedTracks.length > 0) {
            runningAvg = (ratedTracks.reduce((a,t)=>a+t.rating,0)/ratedTracks.length).toFixed(1);
        }
        
        if (totalTracks > 0 && ratedTracks.length === totalTracks) {
            finalAvg = parseFloat(runningAvg);
        }
        
        const avgEl = document.getElementById('modal-avg-score');
        if(avgEl) avgEl.textContent = runningAvg > 0 ? runningAvg : "-"; 
        al.averageScore = finalAvg;

        // Puan rozetinin rengini anasayfadaki kartların arka plan ve yazı stilleriyle birebir aynı yapma
        const circleEl = document.getElementById('modal-avg-score-circle');
        if(circleEl) {
            const ratingForTheme = runningAvg > 0 ? parseFloat(runningAvg) : 0;
            const theme = this.getThemeByRating(ratingForTheme);
            // circleClass yerine anasayfadaki kart tabanının gradyenini (bottomBgClass) ve yazı rengini kullanıyoruz
            circleEl.className = `flex items-center justify-center rounded-full font-black w-10 h-10 md:w-12 md:h-12 text-sm md:text-base border-2 shadow-sm transition-colors duration-300 ${theme.bottomBgClass} ${theme.titleColorClass} border-white/20`;
        }
    },
    
    addNewTrack() { 
        if (!AppState.currentModalAlbum) return;
        if (!AppState.currentModalAlbum.tracks) AppState.currentModalAlbum.tracks = [];
        const tracks = AppState.currentModalAlbum.tracks;
        const newNum = tracks.length > 0 ? (tracks.length + 1).toString() : "1";
        tracks.push({ id: 'manual_' + Date.now(), title: t('add_new_track'), number: newNum, rating: 0 });
        this.renderTracklist();
    }, 
    
    deleteTrack(idx) { 
        if (!AppState.currentModalAlbum || !AppState.currentModalAlbum.tracks) return;
        AppState.currentModalAlbum.tracks.splice(idx, 1);
        this.renderTracklist();
        this.calculateAverageScore();
    },

    saveAlbumToLibrary() {
        if(!AppState.currentModalAlbum) return;
        
        const title = document.getElementById('album-title').value.trim();
        if(!title) {
            showToast("Albüm adı zorunludur.", "error");
            return;
        }

        AppState.currentModalAlbum.title = title;
        AppState.currentModalAlbum.artist = document.getElementById('album-artist').value.trim();
        AppState.currentModalAlbum.year = document.getElementById('album-year').value.trim();
        AppState.currentModalAlbum.label = document.getElementById('album-label').value.trim();
        AppState.currentModalAlbum.country = document.getElementById('album-country').value.trim();
        
        const genreStr = document.getElementById('album-genre').value.trim();
        AppState.currentModalAlbum.genres = genreStr ? genreStr.split(',').map(g => g.trim().charAt(0).toUpperCase() + g.trim().slice(1)).filter(g => g) : [];
        
        AppState.currentModalAlbum.note = document.getElementById('album-review').innerHTML.trim();
        
        const isEditing = AppState.library.some(a => a.id === AppState.currentModalAlbum.id);
        
        if (!isEditing) {
            AppState.currentModalAlbum.dateAdded = new Date().toISOString();
        }

        const idx = AppState.library.findIndex(a => a.id === AppState.currentModalAlbum.id);
        if (idx > -1) { 
            AppState.library[idx] = AppState.currentModalAlbum; 
            showToast(t("toast_changes_saved"), "success"); 
        } else { 
            AppState.library.unshift(AppState.currentModalAlbum); 
            showToast(t("toast_album_added"), "success"); 
        }
        
        this.saveAlbumData(AppState.currentModalAlbum); 
        this.updateModalUI(); 
        
        if(AppState.currentView === 'library') { this.renderLibrary(); }
        this.closeModal();
    },
    
    removeAlbumFromLibrary() {
        if(!AppState.currentModalAlbum) return;
        const id = AppState.currentModalAlbum.id;
        AppState.library = AppState.library.filter(a => a.id !== id); 
        this.saveToLocal();
        this.deleteAlbumData(id); 
        showToast(t("toast_album_removed"), "info"); 
        this.closeModal();
        if(AppState.currentView === 'library') { this.renderLibrary(); }
    },

    toggleArtistStatsSort(t) { 
        if (AppState.statsArtistSortBy === t) {
            AppState.statsArtistSortDirection = AppState.statsArtistSortDirection === 'desc' ? 'asc' : 'desc';
        } else {
            AppState.statsArtistSortBy = t;
            AppState.statsArtistSortDirection = 'desc';
        }
        localStorage.setItem('birYonuyleStatsSortBy', AppState.statsArtistSortBy);
        localStorage.setItem('birYonuyleStatsSortDirection', AppState.statsArtistSortDirection);
        this.renderStats(); 
    },
    
    toggleArtistStatsSort(t) { 
        if (AppState.statsArtistSortBy === t) {
            AppState.statsArtistSortDirection = AppState.statsArtistSortDirection === 'desc' ? 'asc' : 'desc';
        } else {
            AppState.statsArtistSortBy = t;
            AppState.statsArtistSortDirection = 'desc';
        }
        localStorage.setItem('birYonuyleStatsSortBy', AppState.statsArtistSortBy);
        localStorage.setItem('birYonuyleStatsSortDirection', AppState.statsArtistSortDirection);
        this.renderStats(); 
    },

    renderStats() {
        const lib = AppState.library;
        const setEl = (id, txt) => { const el = document.getElementById(id); if(el) el.textContent = txt; };
        
        setEl('stat-total-albums', lib.length);
        const uniqueArtists = new Set(lib.map(a => a.artist)).size;
        setEl('stat-unique-artists', uniqueArtists);

        const rated = lib.filter(a => a.averageScore > 0);
        const gAvg = rated.length ? (rated.reduce((s,a) => s + a.averageScore, 0) / rated.length).toFixed(1) : "0.0";
        setEl('stat-avg-rating', gAvg);

        const aStats = {}, gStats = {};
        lib.forEach(a => {
            if(!aStats[a.artist]) aStats[a.artist] = { c:0, s:0, rc:0 };
            aStats[a.artist].c++; if(a.averageScore > 0) { aStats[a.artist].s += a.averageScore; aStats[a.artist].rc++; }
            if(a.genres) a.genres.forEach(g => { const ng = g.trim().toLowerCase(); if(!gStats[ng]) gStats[ng]={n:g.trim(),c:0, raw: g.trim()}; gStats[ng].c++; });
        });

        const distribution = { '0.5': 0, '1.0': 0, '1.5': 0, '2.0': 0, '2.5': 0, '3.0': 0, '3.5': 0, '4.0': 0, '4.5': 0, '5.0': 0 };
        lib.forEach(a => {
            if(a.tracks) {
                a.tracks.forEach(t => { 
                    if(t.rating > 0 && t.rating <= 5) {
                        let r = (Math.round(t.rating * 2) / 2).toFixed(1);
                        if(distribution[r] !== undefined) distribution[r]++; 
                    }
                });
            }
        });

        const decades = {};
        rated.forEach(a => {
            const year = parseInt(a.year);
            if(!isNaN(year)) {
                const decade = Math.floor(year / 10) * 10;
                if(!decades[decade]) decades[decade] = { sum: 0, count: 0 };
                decades[decade].sum += a.averageScore;
                decades[decade].count++;
            }
        });
        const sortedDecades = Object.keys(decades).sort();
        const decadeLabels = sortedDecades.map(d => `${d}s`);
        const decadeData = sortedDecades.map(d => (decades[d].sum / decades[d].count).toFixed(2));

        const trends = {};
        rated.forEach(a => {
            if(a.dateAdded) {
                const d = new Date(a.dateAdded);
                if(!isNaN(d.getTime())) {
                    const month = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
                    if(!trends[month]) trends[month] = { sum: 0, count: 0 };
                    trends[month].sum += a.averageScore;
                    trends[month].count++;
                }
            }
        });
        const sortedMonths = Object.keys(trends).sort();
        const trendData = sortedMonths.map(m => (trends[m].sum / trends[m].count).toFixed(2));

        const isDark = document.documentElement.classList.contains('dark');
        const tColor = isDark ? '#d1d5db' : '#374151';
        const gColor = isDark ? '#374151' : '#e5e7eb';
        
        const buildChart = (canvasId, type, labels, dataPoints, hexColor, forceZero = true) => {
            const ctx = document.getElementById(canvasId);
            if(!ctx) return;
            
            if(this.chartInstances[canvasId]) this.chartInstances[canvasId].destroy();
            
            this.chartInstances[canvasId] = new Chart(ctx, {
                type: type,
                data: {
                    labels: labels,
                    datasets: [{
                        data: dataPoints,
                        backgroundColor: type === 'line' ? `${hexColor}20` : hexColor,
                        borderColor: hexColor,
                        borderWidth: 2,
                        fill: type === 'line',
                        tension: 0.4,
                        borderRadius: type === 'bar' ? 4 : 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        x: { ticks: { color: tColor, font: { family: 'Merriweather', size: 10 } }, grid: { display: false } },
                        y: { ticks: { color: tColor, font: { family: 'Merriweather', size: 10 } }, grid: { color: gColor }, beginAtZero: forceZero }
                    }
                }
            });
        };

        buildChart('chart-distribution', 'bar', Object.keys(distribution).map(k => k + ' ★'), Object.values(distribution), '#d17b38');
        buildChart('chart-decade', 'bar', decadeLabels, decadeData, '#3b82f6', false);
        buildChart('chart-trends', 'line', sortedMonths, trendData, '#22c55e', false);

        const tl = document.getElementById('top-albums-list'); 
        if(tl) {
            tl.innerHTML = '';
            [...rated].sort((a,b)=>b.averageScore-a.averageScore).slice(0,5).forEach((al, i) => {
                const el = document.createElement('div'); el.className = 'flex items-center gap-3 p-2 bg-lightBg dark:bg-surface rounded-xl cursor-pointer active:scale-95 transition-transform hover:bg-lightHighlight dark:hover:bg-surfaceHover'; el.onclick = () => this.openAlbumModal(al.id, al.title, al.artist, al.year);
                el.innerHTML = `<span class="font-bold text-gray-400 w-4 text-center">${i+1}</span><img src="${Utils.escapeHTML(al.customCoverUrl || al.coverUrl)}" class="w-10 h-10 rounded shadow-sm object-cover"><div class="flex-1 min-w-0"><p class="text-sm font-bold truncate italic">${Utils.escapeHTML(al.title)}</p><p class="text-[10px] text-gray-500 truncate">${Utils.escapeHTML(al.artist)}</p></div><span class="text-xs font-bold text-yellow-500 bg-yellow-50 dark:bg-yellow-500/10 px-2 py-1 rounded-lg">${al.averageScore.toFixed(1)}</span>`;
                tl.appendChild(el);
            });
        }

        ['rating', 'count'].forEach(type => {
            const btn = document.getElementById(`btn-stats-sort-${type}`); 
            const iconDir = document.getElementById(`icon-stats-sort-${type}-dir`);
            if (!btn || !iconDir) return;
            if (AppState.statsArtistSortBy === type) {
                btn.classList.add('text-primary', 'bg-primary/10'); btn.classList.remove('text-gray-500');
                iconDir.className = `ph-bold ph-arrow-${AppState.statsArtistSortDirection === 'desc' ? 'down' : 'up'} text-[10px]`;
                iconDir.classList.remove('hidden');
            } else {
                btn.classList.remove('text-primary', 'bg-primary/10'); btn.classList.add('text-gray-500');
                iconDir.classList.add('hidden');
            }
        });

        const dir = AppState.statsArtistSortDirection === 'desc' ? 1 : -1;
        const alEl = document.getElementById('artist-list'); 
        if(alEl) {
            alEl.innerHTML = '';
            Object.keys(aStats).sort((a,b) => {
                if (AppState.statsArtistSortBy === 'rating') {
                    const avgA = aStats[a].rc ? aStats[a].s/aStats[a].rc : 0;
                    const avgB = aStats[b].rc ? aStats[b].s/aStats[b].rc : 0;
                    return (avgB - avgA) * dir;
                } else {
                    return (aStats[b].c - aStats[a].c) * dir;
                }
            }).slice(0,10).forEach(art => {
                const st = aStats[art], avg = st.rc ? (st.s/st.rc).toFixed(1) : '-';
                const li = document.createElement('li'); li.className = 'p-3 flex justify-between items-center text-sm cursor-pointer hover:bg-lightBg dark:hover:bg-surfaceHover transition-colors active:bg-lightHighlight dark:active:bg-darker';
                li.onclick = () => {
                    app.showView('library');
                    app.setFilter('Group', art);
                    window.scrollTo(0,0);
                    showToast(`${t('toast_filtered_genre')} ${Utils.escapeHTML(art)}`, "info");
                };
                li.innerHTML = `<div><p class="font-bold">${Utils.escapeHTML(art)}</p><p class="text-[10px] text-gray-500">${st.c} ${t('albums')}</p></div><span class="text-yellow-500 font-bold flex items-center gap-1"><i class="ph-fill ph-star"></i> ${avg}</span>`;
                alEl.appendChild(li);
            });
        }

        const glEl = document.getElementById('genre-list'); 
        if(glEl) {
            glEl.innerHTML = '';
            Object.values(gStats).sort((a,b)=>b.c-a.c).slice(0,8).forEach(g => {
                const displayG = tGenre(g.n);
                const li = document.createElement('li'); li.className = 'p-2 bg-lightBg dark:bg-surface rounded-lg flex justify-between items-center text-sm cursor-pointer hover:bg-lightHighlight dark:hover:bg-surfaceHover transition-colors active:scale-95';
                li.onclick = () => {
                    app.showView('library');
                    app.setFilter('Genre', g.raw);
                    window.scrollTo(0,0);
                    showToast(`${t('toast_filtered_genre')} ${Utils.escapeHTML(displayG)}`, "info");
                };
                li.innerHTML = `<span class="font-medium">${Utils.escapeHTML(displayG)}</span><span class="text-xs bg-white dark:bg-darker px-2 py-0.5 rounded-full text-gray-500 font-bold">${g.c}</span>`;
                glEl.appendChild(li);
            });
        }
    }
,

updateLiteratureSearchPlaceholder() {
        const inp = document.getElementById('literature-search-input');
        const searchTypes = document.getElementsByName('literatureSearchType');
        let tType = 'book';
        for(let st of searchTypes) { if(st.checked) tType = st.value; }
        if(inp) inp.placeholder = tType === 'author' ? 'Yazar adı yazın...' : 'Kitap adı yazın...';
    },

    async searchLiterature() {
        if (this.isSearchingLiterature) return;
        const input = document.getElementById('literature-search-input').value.trim(); 
        if (!input) return;
        
        this.isSearchingLiterature = true; 
        const btnSearch = document.getElementById('literature-search-btn');
        if(btnSearch) btnSearch.disabled = true;
        
        let searchType = 'book';
        const searchTypes = document.getElementsByName('literatureSearchType');
        for(let st of searchTypes) { if(st.checked) searchType = st.value; }
        
        const resCon = document.getElementById('literature-search-results');
        const load = document.getElementById('literature-search-loading');
        const statText = document.getElementById('literature-search-status-text');
        
        if(resCon) resCon.innerHTML = ''; 
        if(load) { load.classList.remove('hidden'); load.classList.add('flex'); }
        if(statText) statText.textContent = searchType === 'author' ? 'Yazar aranıyor...' : 'Kitaplar aranıyor...';

        try {
            let apiUrl = '';
            if (searchType === 'author') {
                apiUrl = `https://openlibrary.org/search.json?author=${encodeURIComponent(input)}&limit=30`;
            } else {
                apiUrl = `https://openlibrary.org/search.json?title=${encodeURIComponent(input)}&limit=30`;
            }
            
            // Open Library API
            const res = await fetch(apiUrl);
            const data = await res.json();
            
            // Open Library formatını mevcut Google Books (volumeInfo) formatına uyarlıyoruz
            const books = (data.docs || []).map(doc => {
                return {
                    volumeInfo: {
                        title: doc.title,
                        authors: doc.author_name || [],
                        publishedDate: doc.first_publish_year ? doc.first_publish_year.toString() : '',
                        imageLinks: doc.cover_i ? { thumbnail: `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg` } : null,
                        pageCount: doc.number_of_pages_median || '',
                        publisher: doc.publisher ? doc.publisher[0] : '',
                        description: '', 
                        categories: doc.subject ? [doc.subject[0]] : []
                    }
                };
            });
            
            if (books.length === 0 && resCon) { 
                resCon.innerHTML = `<div class="col-span-full text-center p-8 text-gray-500">Bulunamadı. Farklı bir terim deneyin.</div>`; 
                return; 
            }
            
            this.renderLiteratureSearchResults(books);
        } catch (e) { 
            showToast("Arama sırasında hata oluştu.", "error"); 
            console.error(e);
        } finally { 
            if(load) { load.classList.add('hidden'); load.classList.remove('flex'); }
            this.isSearchingLiterature = false; 
            if(btnSearch) btnSearch.disabled = false; 
        }
    },

    renderLiteratureSearchResults(books) {
        const con = document.getElementById('literature-search-results'); 
        if(!con) return;
        con.innerHTML = '';
        const frag = document.createDocumentFragment();

        books.forEach(item => {
            const vol = item.volumeInfo;
            if (!vol) return;
            
            const title = Utils.escapeHTML(vol.title || 'Bilinmeyen Kitap');
            const author = Utils.escapeHTML(vol.authors ? vol.authors.join(', ') : 'Yazar Bilinmiyor');
            const year = vol.publishedDate ? vol.publishedDate.substring(0, 4) : '-';
            
            let coverUrl = vol.imageLinks ? vol.imageLinks.thumbnail : '';
            if(coverUrl) coverUrl = coverUrl.replace('http:', 'https:').replace('zoom=1', 'zoom=2');
            
            const pages = vol.pageCount || '';
            const publisher = vol.publisher || '';
            const description = vol.description || '';
            const categories = vol.categories ? vol.categories.join(', ') : '';
            
            const inLib = (AppState.literatureLibrary || []).some(a => a.title === title && a.author === author);

            const card = document.createElement('div');
            card.className = `bg-white dark:bg-surface p-2.5 rounded-xl border ${inLib ? 'border-primary' : 'border-lightBorder dark:border-gray-800'} flex gap-3 active:scale-[0.98] transition-transform shadow-sm cursor-pointer hover:bg-lightHighlight dark:hover:bg-surfaceHover`;
            
            card.onclick = () => {
                this.openLiteratureModal();
                
                setTimeout(() => {
                    document.getElementById('literature-title').value = title;
                    document.getElementById('literature-author').value = author;
                    document.getElementById('literature-year').value = year;
                    document.getElementById('literature-cover').value = coverUrl;
                    document.getElementById('literature-modal-cover').src = coverUrl || 'https://placehold.co/400x600/ebe4dc/594636?text=Yok';
                    document.getElementById('literature-pages').value = pages;
                    document.getElementById('literature-publisher').value = publisher;
                    document.getElementById('literature-genre').value = categories;
                    document.getElementById('literature-review').innerHTML = description;
                    
                    const existingBook = (AppState.literatureLibrary || []).find(a => a.title === title && a.author === author);
                    if (existingBook) {
                        AppState.currentLiteratureId = existingBook.id;
                        this.currentLiteratureRating = existingBook.rating || 0;
                        this.renderLiteratureRating();
                        document.getElementById('literature-country').value = existingBook.country || '';
                        document.getElementById('literature-translator').value = existingBook.translator || '';
                        document.getElementById('literature-review').innerHTML = existingBook.review || description;
                        document.querySelectorAll('.literature-delete-btn').forEach(b => b.classList.remove('hidden'));
                    }
                }, 50);
            };

            card.innerHTML = `
                <img loading="lazy" src="${coverUrl}" onerror="this.src='https://placehold.co/150x225/ebe4dc/594636?text=Yok'; this.onerror=null;" class="w-16 h-24 bg-lightHighlight rounded-lg object-cover flex-shrink-0">
                <div class="flex flex-col justify-center overflow-hidden flex-grow py-1">
                    <h4 class="font-bold text-gray-900 dark:text-white truncate text-sm md:text-base italic">${title}</h4>
                    <p class="text-xs text-gray-500 truncate mb-1">${author}</p>
                    <div class="flex gap-1.5 mt-auto">
                        <span class="text-[10px] bg-lightBg dark:bg-darker px-2 py-0.5 rounded text-gray-600 font-bold">${year}</span>
                        ${inLib ? `<span class="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded font-bold flex items-center gap-1"><i class="ph-fill ph-check-circle"></i> Eklendi</span>` : ''}
                    </div>
                </div>`;
            frag.appendChild(card);
        });
        con.appendChild(frag);
    },


    };

    
    

    

window.app = app;
app.init();