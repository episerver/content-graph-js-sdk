const subcribeContentSavedEvent = (callback: (message: any) => void) => (window as any).epi?.subscribe('contentSaved', callback)
export { subcribeContentSavedEvent }