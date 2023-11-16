import { Controller } from "@nestjs/common";
import { ErrorHistoryService } from "./errorhistory.service";

@Controller('/errorhistory')
export class ErrorHistoryController {
  constructor(private errorHistoryService: ErrorHistoryService) {}
  
}