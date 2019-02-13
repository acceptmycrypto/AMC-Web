export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

export const openModal = () => {
    return {
        type: 'OPEN_MODAL',
        payload: {visible: true}
    }
};

export const closeModal = () => {
    // action
        // made up of two parts 1. type 2. payload
    return {
        type: 'CLOSE_MODAL', //what does the action do = title of action
        payload: {visible: false} // any data you need to return
    }
};
