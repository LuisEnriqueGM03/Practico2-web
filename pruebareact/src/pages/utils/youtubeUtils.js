export function getVideoId(url) {
    if (url.includes("embed")) {
        return null;
    }
    const videoId = url.match(/(?:https?:\/{2})?(?:www\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
    if (videoId != null) {
        return videoId[1];
    }

    return null;
}
