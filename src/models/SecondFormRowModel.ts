export interface SecondFormRowModel {
    firstServiceRate: number,
    firstServiceRatePercentage: number,
    secondServiceRate: number,
    secondServiceRatePercentage: number
}

export interface SecondFormRowErrorModel {
    isFirstServiceRateError: boolean,
    isFirstServiceRateTouched: boolean,
    isFirstServiceRatePercentageError: boolean,
    isFirstServiceRatePercentageTouched: boolean,
    isSecondServiceRateError: boolean,
    isSecondServiceRateTouched: boolean,
    isSecondServiceRatePercentageError: boolean
    isSecondServiceRatePercentageTouched: boolean
}