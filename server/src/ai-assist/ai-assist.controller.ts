import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import OpenAI from 'openai';

import { IChatRequest, IChatResponse } from './model/openai.interface';
import { OpenaiService } from './ai-assist.service';

@Controller('openai')
export class OpenaiController {
  constructor(private openaiService: OpenaiService) {}

  @Post('/chat')
  @HttpCode(200)
  async getChatOpenai(@Body() request: IChatRequest): Promise<IChatResponse> {
    const getMessages = (await this.openaiService.getMessagesData(
      request,
    )) as OpenAI.ChatCompletion;
    return this.openaiService.getChatOpenaiResponse(getMessages);
  }
}
