export interface IApiData {

    /** The result of the api method
     * @var success true | false
     */
    success: boolean;

    /** HTTP status
     * @var status
     */
    status: number;

    /** Server response
     * @var data
     */
    data: any;
}
