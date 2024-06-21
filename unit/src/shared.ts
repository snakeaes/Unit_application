export enum DocStatus {
	NotOpened = 'Непрочитанное',
	Processing = 'На рассмотрении',
	Denied = 'Отклонено',
	Approved = 'Одобрено'
}

export enum DocTheme {
	Vacation = 'vacation',
	Fire = 'fire'
}

export enum Priority {
	High = 'High',
	Medium = 'Medium',
	Low = 'Low'
}

export enum WidgetOptions {
	Docs = 'docs',
	Tasks = 'tasks'
}

export enum Status {
	InProgress = 'В работе',
	Done = 'Завершено',
	Planned = 'Запланировано',
	Declined = 'Отменено',
	Review = 'На проверке'
}

export enum DocSortOptions {
	Latest = 'latest_req',
	Unclosed = 'unclosed_req',
	Template = 'template_req'
}

export enum PersonStatus {
	Work = 'На работе',
	Vacation = 'В отпуске',
	BusinessTrip = 'В командировке',
	Sick = 'На больничном'
}

export enum Roles {
	Chief = 'Начальник',
	Deputy = 'Заместитель начальника',
	Employee = 'Сотрудник'
}

export enum SortPeople {
	Name = 'name',
	Phone = 'phone',
	Mail = 'mail',
	Department = 'department',
	Role = 'role',
	Status = 'status'
}
