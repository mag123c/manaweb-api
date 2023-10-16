import { Controller } from "@nestjs/common";
import { ErrorHistoryService } from "./errorhistory.service";

@Controller('/api/v1/errorhistory')
export class ErrorHistoryController {
  constructor(private errorHistoryService: ErrorHistoryService) {}
  
}