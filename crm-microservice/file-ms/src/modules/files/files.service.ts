import { Injectable } from '@nestjs/common';
import * as xlsx from 'xlsx';

@Injectable()
export class FilesService {
    fileParser(file: Express.Multer.File) {
        const workbook = xlsx.read(file.buffer['data'], { type: 'buffer' });
        const sheetNames = workbook.SheetNames;
        const totalSheets = sheetNames.length;

        const parsedData = [];

        for (let i = 0; i < totalSheets; i++) {
            const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[i]]);

            parsedData.push(...data);
        }
        return parsedData;
    }
}
