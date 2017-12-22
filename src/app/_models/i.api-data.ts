export interface iApiData {

   /** The result of the api method
    * @var success true | false
    */ 
   success :string;

   /** HTTP status
    * @var status 
    */
   status :number;

   /** Server response 
    * @var data 
    */
   data :any;
}