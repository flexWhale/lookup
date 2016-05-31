module FlexWhale.Lookup {
    export class ContainsFilterController implements IFilterController {

        filter(items: any[], filterProp: string, text: string): any[] {
            if (text.length === 0)
                return items;

            const result = new Array<any>();
            for (let indexItem = 0; indexItem < items.length; indexItem++) {
                const currentItem = items[indexItem];
                if (currentItem[filterProp].toLowerCase().indexOf(text.toLowerCase()) !== -1)
                    result.push(currentItem);
            }
            return result;

        }
    }
}