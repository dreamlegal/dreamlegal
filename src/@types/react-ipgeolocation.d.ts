declare module 'react-ipgeolocation' {
    interface GeoLocation {
        country:string
        // Add other properties if needed
    }

    function useGeoLocation(): GeoLocation;

    export default useGeoLocation;
}