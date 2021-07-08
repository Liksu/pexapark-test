export interface FarmInfo {
    capacity: number
    farm_id: number
    frommark: string
    tomark: string
    value: number
    data?: FarmData
}

export interface VisibleFarms extends Array<FarmInfo> {}

export interface AvailableFarm {
    capacity: number
    farm_id: number
    visible: number
}

export interface AvailableFarms extends Array<AvailableFarm> {}

export interface FarmDataItem {
    timemark: number
    value: number
}

export interface FarmData extends Array<FarmDataItem> {}

export interface ClusterData {
    [farmId: number]: FarmData
}

export interface ClusterCapacity {
    total: number
    farms: {
        [farmId: number]: number
    }
}

export interface AggregatedCapacity extends Array<{
    date: Date
    factor: number
    missedHours: number
}> {}
