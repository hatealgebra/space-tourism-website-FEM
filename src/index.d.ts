interface IImages {
    png: string;
    webp: string;
}

interface ITechImages {
    landscape: string;
    portrait: string;
}

interface IBaseDataInstance {
    name: string;
    images: IImages;
}

interface IDestinationData extends IBaseDataInstance {
    description: string;
    distance: string;
    travel: string;
}

interface ICrewData extends IBaseDataInstance {
    role: string;
    bio: string;
}

interface ITechnologyData extends IBaseDataInstance {
    description: string;
    images: ITechImages;
}
