export default function () {
    return (
        <div>
            fofa
            <div role="tablist" class="tabs tabs-lifted">
                <input type="radio" name="my_tabs_2" role="tab" class="tab" aria-label="Tab 1" />
                <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">Tab content 1</div>

                <input type="radio" name="my_tabs_2" role="tab" class="tab" aria-label="Tab 2" checked />
                <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">Tab content 2</div>

                <input type="radio" name="my_tabs_2" role="tab" class="tab" aria-label="Tab 3" />
                <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">Tab content 3</div>
            </div>
            <div role="tablist" class="tabs tabs-bordered">
                <input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="Tab 1" />
                <div role="tabpanel" class="tab-content p-10">Tab content 1</div>

                <input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="Tab 2" checked />
                <div role="tabpanel" class="tab-content p-10">Tab content 2</div>

                <input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="Tab 3" />
                <div role="tabpanel" class="tab-content p-10">Tab content 3</div>
            </div>
        </div>
    )
}